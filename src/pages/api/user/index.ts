import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbConnect";
import { UserModel } from "@/db/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  try {
    if (req.method === "GET") {
      const { name, tags } = req.query;

      let query: any = {};

      if (session && session.user && session.user.email) {
        query.email = { $ne: session.user.email };
      }

      if (name) {
        query.name = new RegExp(`^${name}`, "i");
      }

      if (tags) {
        const tagsArray = Array.isArray(tags) ? tags : [tags];
        query.tags = { $all: tagsArray };
      }

      const users = await UserModel.find(query)
        .select("email image name tags slug")
        .sort({ createdAt: -1 });

      if (!users || users.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(users);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
