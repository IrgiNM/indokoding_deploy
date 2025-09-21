import { db } from "@/firebase/config";
import {
    collection, getDocs, query,
    writeBatch
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import fs from "fs";
import path from "path";

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
    // Contoh: hapus hanya messages yang sudah dibaca
    const ourWorksQuery = query(
        collection(db, "AboutImage")
    );
    
    const snapshot = await getDocs(ourWorksQuery);

    // Gunakan batch untuk menghapus lebih efisien
    const batch = writeBatch(db);
    snapshot.docs.forEach(docSnap => {
        batch.delete(docSnap.ref);
    });

    await batch.commit();

    // 🔹 Hapus semua file di folder public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "aboutUs");

    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);

      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        fs.unlinkSync(filePath); // hapus file
      }
    }

    return res.status(200).json({
        message: `${snapshot.size} About image berhasil dihapus`,
        deletedCount: snapshot.size
    });
  } catch (error) {
    // console.error("Error hapus semua about image:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
