import express from "express";
import { showLogin, postLogin, logout } from "../controllers/authController.mjs";

const router = express.Router();
router.get("/login", showLogin);
router.post("/login", postLogin);
router.get("/logout", logout);

export default router;
