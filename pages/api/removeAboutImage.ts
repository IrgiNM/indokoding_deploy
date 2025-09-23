import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import path from "path";

interface AboutImageData {
  id: string;
  file: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔹 Aktifkan CORS
  await NextCors(req, res, {
    methods: ["DELETE", "OPTIONS"],
    origin: "*", // bisa disesuaikan
    optionsSuccessStatus: 200,
  });

  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }

  try {
    const { id, file, }: AboutImageData = req.body;

    if (!id || !file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Lokasi folder upload
    const uploadDir = path.join(process.cwd(), "public", "uploads", "aboutUs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // jika ada, file nya diapus dari public
    if (file) {
        const oldPath = path.join(uploadDir, file);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
    }

    // Referensi ke dokumen user
    const userRef = doc(db, "AboutImage", id);

    // Hapus dokumen
    await deleteDoc(userRef);

    return res.status(200).json({
      message: `OurWork message dengan id ${id} berhasil dihapus`,
    });
  } catch (error) {
    // console.error("Error hapus user:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
