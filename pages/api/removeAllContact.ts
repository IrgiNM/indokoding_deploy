import { db } from "@/firebase/config";
import {
  collection, getDocs, query,
  where, writeBatch
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
// import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔹 Aktifkan CORS
  // await NextCors(req, res, {
  //   methods: ["DELETE", "OPTIONS"],
  //   origin: "*", // bisa disesuaikan
  //   optionsSuccessStatus: 200,
  // });
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }

  try {
    // Contoh: hapus hanya messages yang sudah dibaca
    const contactsQuery = query(
        collection(db, "contacts"),
        where("dibaca_oleh", "!=", [])
    );
    
    const snapshot = await getDocs(contactsQuery);

    // Gunakan batch untuk menghapus lebih efisien
    const batch = writeBatch(db);
    snapshot.docs.forEach(docSnap => {
        batch.delete(docSnap.ref);
    });

    await batch.commit();

    return res.status(200).json({
        message: `${snapshot.size} messages berhasil dihapus`,
        deletedCount: snapshot.size
    });
  } catch {
    // console.error("Error hapus semua message:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
