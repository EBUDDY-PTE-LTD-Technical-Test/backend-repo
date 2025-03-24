import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    (req as any).user = decodedToken;

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
