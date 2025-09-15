import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase/config";
import { doc, updateDoc, serverTimestamp, collection } from "firebase/firestore";
import formidable from "formidable";
import type { Fields, Files } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false }, // ✅ wajib kalau pakai formidable
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    // Parsing form-data
    const form = formidable({ multiples: false });
    const [fields, files]: [Fields, Files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const id = fields.id?.[0] || fields.id;
    const title = fields.title?.[0] || fields.title;
    const oldFileName = fields.fileName?.[0] || fields.fileName;
    const tags = fields.tags?.[0] || fields.tags;
    const description = fields.description?.[0] || fields.description;
    const fileData = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!id || !title || !tags || !description) {
      return res.status(400).json({
        error: "title, tags, description wajib diisi",
        fields,
        files,
      });
    }
    if (!files) {
      return res.status(400).json({
        error: "files belum dipilih, wajib diisi",
        fields,
        files,
      });
    }

    // Lokasi folder upload
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let newFileName = oldFileName; // default pakai nama lama

    // Jika user upload file baru → ganti file
    if (fileData) {
      newFileName = `${Date.now()}-${fileData.originalFilename}`;
      const newPath = path.join(uploadDir, newFileName);

      fs.renameSync(fileData.filepath, newPath);

      // Hapus file lama kalau ada dan berbeda
      if (oldFileName && oldFileName !== newFileName) {
        // const oldPath = path.join(uploadDir, oldFileName);
        const safeOldFileName = Array.isArray(oldFileName) ? oldFileName[0] : oldFileName;
        const oldPath = path.join(uploadDir, safeOldFileName);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    // ✅ Update metadata ke Firestore
    const safeId = Array.isArray(id) ? id[0] : id;

    const docRef = doc(collection(db, "ourWorks"), safeId);
    await updateDoc(docRef, {
      title,
      tags: (typeof tags === "string" ? tags.split(",") : tags)?.map((t) => t.trim()).filter(Boolean),
      description,
      fileName: newFileName,
      updatedAt: serverTimestamp(),
    });

    return res.status(200).json({
      message: "OurWork updated successfully",
      data: {
        id,
        title,
        tags,
        description,
        fileName: newFileName,
        fileUrl: `/uploads/${newFileName}`,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: error });
  }
}
