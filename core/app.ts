import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import authRoutes from "../routes/authRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});
