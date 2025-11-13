import { User } from "../models/index.mjs";
import { logger } from "../utils/logger.mjs";
import { success, error as respError } from "../utils/response.mjs";

export const listUsersPage = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["id", "username", "email", "fullName", "role", "createdAt"] });
    res.render("pages/users", { users, currentUser: req.user });
  } catch (err) {
    next(err);
  }
};

export const showCreatePage = (req, res) => {
  res.render("pages/user_form", { user: null });
};

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName, role } = req.body;
    await User.create({ username, email, password, fullName, role });
    logger.info(`User created: ${username}`);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

export const showEditPage = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("Not found");
    res.render("pages/user_form", { user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("Not found");
    const { username, email, password, fullName, role } = req.body;
    user.username = username;
    user.email = email;
    if (password && password.trim().length > 0) user.password = password; // hook will hash
    user.fullName = fullName;
    user.role = role;
    await user.save();
    logger.info(`User updated: ${user.username}`);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("Not found");
    await user.destroy();
    logger.info(`User deleted: ${user.username}`);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
};
