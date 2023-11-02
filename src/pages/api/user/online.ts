import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbConnect";
import { UserModel } from "@/db/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  await dbConnect();

  try {
    if (req.method === "POST") {
      if (!session) {
        return res.status(401).json({ error: "unauthorized" });
      }

      const { online } = req.body;

      if (!online || typeof online !== "boolean") {
        return res
          .status(400)
          .json({ error: "online state required and must be a boolean" });
      }

      const user = await UserModel.findOne({ email: session?.user?.email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.online === online) {
        return res
          .status(200)
          .json({ message: "No update needed", online: user.online });
      }

      console.log("userUpdated: ONLINE: ", online);

      const updatedUser = await UserModel.findOneAndUpdate(
        { email: session?.user?.email },
        { $set: { online } },
        { new: true }
      );

      return res.status(200).json(updatedUser!.online);
    } else if (req.method === "GET") {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = (await UserModel.findOne({ email: email }).select(
        "online updatedAt role"
      )) as {
        online: boolean;
        updatedAt: Date;
        role: "ADMIN" | "USER" | "BOT";
      };

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const tenMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

      if (user.role === "BOT") {
        return res.status(200).json({ online: user.online });
      }

      if (user.online && user.updatedAt < tenMinutesAgo) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { email: email, online: true, updatedAt: { $lt: tenMinutesAgo } },
          { $set: { online: false } },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(200).json({ online: user.online });
        }

        return res.status(200).json({ online: updatedUser.online });
      } else {
        return res.status(200).json({ online: user.online });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
