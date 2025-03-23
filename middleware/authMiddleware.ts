import { NextFunction, Request, Response } from "express";
import { admin } from "../config/fireBaseConfig";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization; // this is like a bearerToken for login
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Unauthorized:Missing or Invalid token format" });
    }

    const token = authHeader.split("Bearer ")[1]; //verify the existing token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const decoded = await admin.auth().verifyIdToken(token)

    (req as any).user =decoded
    next();
  } catch (error) {
    console.log(error, "THIS IS MIDDLEWARE");

    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
