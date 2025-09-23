import { db } from "@/firebase/config";
import {
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

interface UserData {
  email: string;
  role: string;
}

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
      const {
        email,
        role,
      }: UserData = req.body;

      if (!role || !email) {
        return res
          .status(400)
          .json({ error: "Role dan email wajib diisi" });
      }

      const qEmail = query(collection(db, "users"), where("email", "==", email), where("role", "==", 'admin'));
      const snapEmail = await getDocs(qEmail);
      
      if (snapEmail.empty) {
        return res.status(400).json({ error: "Anda bukan admin" });
      }

      return res
        .status(200)
        .json({ 
          message: "Anda diterima sebagai admin",        
          email,
          role
      });
    } catch {
      // console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  } else {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }
}

