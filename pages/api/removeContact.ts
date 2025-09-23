import { db } from "@/firebase/config";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
// import NextCors from "nextjs-cors";

interface ContactData {
  id: string;
  email: string;
}

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
    const { id, email, }: ContactData = req.body;

    if (!id || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const usersRef = collection(db, "users");
    
    // 🔍 Cek apakah email ada
    const emailQuery = query(usersRef, where("email", "==", email));
    const emailSnap = await getDocs(emailQuery);
    if (emailSnap.empty) {
      return res.status(404).json({ error: "Email not found" });
    }
    // 🔍 Cek apakah username & email ada di dokumen yang sama
    const userQuery = query(
      usersRef,
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(userQuery);

    // ✅ Ambil user pertama yang cocok
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Update total_contact
    const newTotalContact = (userData.total_contact || 0) - 1;
    await updateDoc(userDoc.ref, { total_contact: newTotalContact });

    // Referensi ke dokumen user
    const userRef = doc(db, "contacts", id);

    // Hapus dokumen
    await deleteDoc(userRef);

    return res.status(200).json({
      message: `Contact message dengan id ${id} berhasil dihapus`,
    });
  } catch {
    // console.error("Error hapus user:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
