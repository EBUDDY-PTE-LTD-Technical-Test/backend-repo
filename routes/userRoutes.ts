import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createUser, fetchUserData, updateUserData } from "../controller/api";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/fetch-user-data/:id", authMiddleware, fetchUserData);
router.put("/update-user-data/:id", authMiddleware, updateUserData);

export default router;
