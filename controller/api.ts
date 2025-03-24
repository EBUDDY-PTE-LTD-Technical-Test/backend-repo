import { Request, Response } from "express";
import { db } from "../config/fireBaseConfig";
import { User } from "../entities/user";

//  Create User
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, name, email } = req.body;

    if (!uid || !name || !email) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    const newUser: User = { uid, name, email };

    await db.collection("users").doc(uid).set(newUser);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Fetch User by ID
export const fetchUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update User
export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const userData: Partial<User> = req.body;

    if (!userId || Object.keys(userData).length === 0) {
      res.status(400).json({ message: "Invalid request data" });
      return;
    }

    await db.collection("users").doc(userId).update(userData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
