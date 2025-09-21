import { db } from "@/firebase/config";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const values: string[] = req.body; // ✅ array langsung

      if (!Array.isArray(values) || values.length === 0) {
        return res.status(400).json({ error: "Array values wajib diisi", values });
      }

      const aboutTextQuery = query(
          collection(db, "AboutText")
      );
      
      const snapshot = await getDocs(aboutTextQuery);
  
      // Gunakan batch untuk menghapus lebih efisien
      const batch = writeBatch(db);
      snapshot.docs.forEach(docSnap => {
          batch.delete(docSnap.ref);
      });

      // Simpan ke dokumen tetap (misalnya id = "aboutPage")
      const docRef = doc(db, "AboutText", "aboutPage");
      await setDoc(docRef, {
        values: values,
        updatedAt: serverTimestamp(),
      });

      return res.status(200).json({
        message: "Data berhasil disimpan (overwrite)",
        values,
      });
    } catch (error) {
      // console.error("Server error:", error);
      return res.status(500).json({ error: error });
    }
  } else {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }
}
