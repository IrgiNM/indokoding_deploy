import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/type/userType";

const SECRET_KEY = "rahasia-super-aman";

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
        username,
        email,
        password,
        role,
        total_contact,
        total_join,
        total_career,
        captcha
      }: User = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Username, email, dan password wajib diisi" });
      }
      if (!captcha) {
        return res.status(400).json({ error: "Please complete the reCAPTCHA verification" });
      }

      // verifikasi captcha ke google
      const params = new URLSearchParams();
      params.append("secret", process.env.RECAPTCHA_SECRET_KEY || "");
      params.append("response", captcha);

      const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return res.status(400).json({ error: "reCAPTCHA verification failed" });
      }

      // 🔍 Pastikan username belum terdaftar
      const qUser = query(collection(db, "users"), where("username", "==", username));
      const snapUser = await getDocs(qUser);
      if (!snapUser.empty) {
        return res.status(400).json({ error: "Username sudah terdaftar" });
      }
  
      // 🔍 Pastikan email belum terdaftar
      const qEmail = query(collection(db, "users"), where("email", "==", email));
      const snapEmail = await getDocs(qEmail);
      if (!snapEmail.empty) {
        return res.status(400).json({ error: "Email sudah terdaftar" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const docRef = await addDoc(collection(db, "users"), {
        username,
        email,
        password: hashedPassword,
        role,
        total_contact: total_contact || 0,
        total_join: total_join || 0,
        total_career: total_career || 0,
        createdAt: serverTimestamp()
      });

      const token = jwt.sign( 
        {                   
          id: docRef.id,
          username,         
          email,
          role,       
        },                  
        SECRET_KEY,         
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .json({ 
          message: "User berhasil disimpan", 
          id: docRef.id,
          username,         
          email,
          role,
          token
      });
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  } else {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }
}

