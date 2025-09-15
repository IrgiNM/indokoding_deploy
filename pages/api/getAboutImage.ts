import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/config";
import NextCors from "nextjs-cors";

// Response type
interface Contact {
  id: string;
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

      // 🔹 Ambil semua data ourWorks
      const snap = await getDocs(collection(db, "AboutImage"));
      const ourWorks: Contact[] = snap.docs.map(doc => ({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      }));

      return res.status(200).json(ourWorks);
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} tidak diizinkan`);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
