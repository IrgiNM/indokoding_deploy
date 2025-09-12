import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false }, // ✅ wajib kalau pakai formidable
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    // Parsing form-data
    const form = formidable({ multiples: false });
    const [fields, files]: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const title = fields.title?.[0] || fields.title;
    const tags = fields.tags?.[0] || fields.tags;
    const description = fields.description?.[0] || fields.description;
    const fileData = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!title || !tags || !description || !fileData) {
      return res.status(400).json({error: "All fields are required", fields, files, title, tags, description, fileData});
    }

    // ✅ Simpan file ke folder public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const newFileName = `${Date.now()}-${fileData.originalFilename}`;
    const newPath = path.join(uploadDir, newFileName);

    fs.renameSync(fileData.filepath, newPath);

    // ✅ Simpan metadata + nama file ke Firestore
    const worksRef = collection(db, "ourWorks");
    const docRef = await addDoc(worksRef, {
      title,
      tags: tags.split(",").map((t: string) => t.trim()),
      description,
      fileName: newFileName, // hanya nama file
      createdAt: serverTimestamp(),
    });

    return res.status(200).json({
      message: "OurWork saved successfully",
      data: {
        id: docRef.id,
        title,
        tags,
        description,
        fileName: newFileName,
        fileUrl: `/uploads/${newFileName}`, // bisa dipakai di frontend
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
