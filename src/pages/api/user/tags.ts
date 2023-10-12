import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbConnect";
import { UserModel } from "@/db/models/userModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    if (req.method === "POST") {
      const { tag } = req.body;

      if (!tag || typeof tag !== "string") {
        return res
          .status(400)
          .json({ error: "Tag is required and must be a string" });
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { email: username },
        { $addToSet: { tags: tag } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ tags: updatedUser.tags });
    } else if (req.method === "DELETE") {
      const { tag } = req.body;

      if (!tag || typeof tag !== "string") {
        return res
          .status(400)
          .json({ error: "Tag is required and must be a string" });
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { email: username },
        { $pull: { tags: tag } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ tags: updatedUser.tags });
    } else if (req.method === "GET") {
      const user = await UserModel.findOne({ email: username }).select("tags");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ tags: user.tags });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
