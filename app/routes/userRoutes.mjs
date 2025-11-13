import express from "express";
import auth from "../middlewares/auth.mjs";
import {
  listUsersPage,
  showCreatePage,
  createUser,
  showEditPage,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";

const router = express.Router();

router.use(auth); // all user routes need auth

router.get("/", listUsersPage);
router.get("/create", showCreatePage);
router.post("/create", createUser);
router.get("/:id/edit", showEditPage);
router.post("/:id/edit", updateUser);
router.post("/:id/delete", deleteUser);

export default router;
