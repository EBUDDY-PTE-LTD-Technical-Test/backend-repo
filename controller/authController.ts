import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export const generateToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.body;

    if (!uid) {
      res.status(400).json({ message: "Missing user ID" });
      return;
    }

    const token = await getAuth().createCustomToken(uid);
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
