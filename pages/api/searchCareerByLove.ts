import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {

      const reqSnap = await getDocs(collection(db, "Requirements_Career"));
      const titles: string[] = reqSnap.docs.map((doc) => doc.data().title);
  
  
      if (titles.length === 0) {
        return res.status(404).json({ error: "Tidak ada data Requirements_Career ditemukan" });
      }

      const careersRef = collection(db, "career_message");
      const q = query(
        careersRef,
        where("position", "in", titles),
        where("favorite", "==", true)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return res.status(200).json({ careers: [] });
      }

      const careers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        };
      });

      return res.status(200).json({ careers });
    } catch {
      // console.error("Error mencari data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
