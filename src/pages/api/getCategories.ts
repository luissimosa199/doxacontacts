import { TimeLineModel } from "../../db/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect";
import { UserModel } from "@/db/models/userModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const modelType = req.query.modelType;

    try {
      let tags;

      if (modelType === "user") {
        tags = await UserModel.distinct("tags");
      } else {
        // Default to timeline if no modelType is provided or if it's not "user"
        tags = await TimeLineModel.distinct("tags");
      }

      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
