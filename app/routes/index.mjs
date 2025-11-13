import express from "express";
import authRoutes from "./authRoutes.mjs";
import userRoutes from "./userRoutes.mjs";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
