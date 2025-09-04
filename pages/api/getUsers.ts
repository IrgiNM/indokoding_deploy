import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, doc, getDoc, DocumentData, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import NextCors from "nextjs-cors";

// Response type
interface User {
  id: string;
  username?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  [key: string]: string | number | boolean | null | undefined | object;
}

function convertTimestamps(data: DocumentData): Record<string, string | number | boolean | null | undefined | object> {
  const result: Record<string, string | number | boolean | null | undefined | object> = {};
  for (const key in data) {
    const value = data[key];
    if (value && typeof value === "object" && "seconds" in value && "nanoseconds" in value) {
      // 🔹 convert Timestamp ke string ISO
      result[key] = new Date(value.seconds * 1000).toISOString();
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ["GET", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    if (req.method === "GET") {
      const { id } = req.query;

      // 🔹 Ambil user by ID
      if (id) {
        const docRef = doc(db, "users", id as string);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          return res.status(404).json({ error: "User tidak ditemukan" });
        }

        const user: User = {
          id: snap.id,
          ...convertTimestamps(snap.data()!),
        };

        // 🔹 Hanya izinkan kalau role guest
        if (user.role !== "guest") {
          return res.status(403).json({ error: "User bukan guest" });
        }

        return res.status(200).json(user);
      }

      // 🔹 Ambil semua user dengan role guest
      const q = query(collection(db, "users"), where("role", "==", "guest"));
      const snap = await getDocs(q);

      const users: User[] = snap.docs.map(doc => ({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      }));

      return res.status(200).json(users);
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} tidak diizinkan`);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
