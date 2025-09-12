import type { NextApiRequest, NextApiResponse } from "next";
import { app, db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import formidable from "formidable";
import fs from "fs";

// Matikan bodyParser bawaan Next.js
export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      // ✅ Parsing form-data
      const form = formidable({ multiples: false });
      const [fields, files]: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });
      console.log("Fields:", fields);

      const title = fields.title?.[0] || fields.title;
      const tags = fields.tags?.[0] || fields.tags;
      const description = fields.description?.[0] || fields.description;
      const fileData = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!title || !tags || !description || !fileData) {
        return res.status(400).json({ error: "All fields are required", fields, files, title, tags, description, fileData });
      }

      // ✅ Upload file ke Firebase Storage
      const storage = getStorage(app);
      const fileBuffer = fs.readFileSync(fileData.filepath);
      const fileName = `ourWorks/${Date.now()}-${fileData.newFilename}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, fileBuffer, {
        contentType: fileData.mimetype,
      });

      const downloadURL = await getDownloadURL(storageRef);

      // ✅ Pisahkan tag berdasarkan koma
      const tagsArray = tags.split(",").map((t: string) => t.trim()).filter(Boolean);

      // ✅ Simpan data ke Firestore
      const contactsRef = collection(db, "ourWorks");
      const docRef = await addDoc(contactsRef, {
        title,
        tags: tagsArray,
        description,
        fileUrl: downloadURL,
        createdAt: serverTimestamp(),
      });

      return res.status(200).json({
        message: "OurWork data saved successfully",
        user: {
          id: docRef.id,
          title,
          tags: tagsArray,
          description,
          fileUrl: downloadURL,
        },
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: error ?? "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
