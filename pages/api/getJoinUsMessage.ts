import { db } from "@/firebase/config";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

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
  await NextCors(req, res, {
    methods: ["GET", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    if (req.method === "GET") {

      const q = query(
        collection(db, "career_message")
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
  } catch (error) {
    console.error("Error fetching filtered career messages:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
