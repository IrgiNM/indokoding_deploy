import { db } from "@/firebase/config";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
// import NextCors from "nextjs-cors";

// Tipe response
interface CareerMessage {
  id: string;
  [key: string]: string | number | boolean | null | undefined | object;
}

function convertTimestamps(data: DocumentData): Record<string, string | number | boolean | null | undefined | object> {
  const result: Record<string, string | number | boolean | null | undefined | object> = {};
  for (const key in data) {
    const value = data[key];
    if (
      value &&
      typeof value === "object" &&
      "seconds" in value &&
      "nanoseconds" in value
    ) {
      result[key] = new Date(value.seconds * 1000).toISOString();
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await NextCors(req, res, {
  //   methods: ["GET", "OPTIONS"],
  //   origin: "*",
  //   optionsSuccessStatus: 200,
  // });
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  try {
    if (req.method === "GET") {
      // 1. Ambil semua title dari Requirements_Career
      const reqSnap = await getDocs(collection(db, "Requirements_Career"));
      const titles: string[] = reqSnap.docs.map((doc) => doc.data().title);


      if (titles.length === 0) {
        return res.status(404).json({ error: "Tidak ada data Requirements_Career ditemukan" });
      }

      // 2. Ambil semua data career_message yang position-nya ada di array titles
      const q = query(
        collection(db, "career_message"),
        where("position", "in", titles) // filter berdasarkan position
      );
      const messageSnap = await getDocs(q);

      const messages: CareerMessage[] = messageSnap.docs.map((doc) => ({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      }));

      return res.status(200).json(messages);
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} tidak diizinkan`);
  } catch {
    // console.error("Error fetching filtered career messages:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
