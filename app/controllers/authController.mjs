import { User } from "../models/index.mjs";
import { logger } from "../utils/logger.mjs";

export const showLogin = (req, res) => {
  res.render("pages/login", { user: null, error: null ,currentUser: req.session?.user });
};

export const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.render("pages/login", { error: "Invalid credentials", user: null });
    }
    const ok = await user.verifyPassword(password);
    if (!ok) {
      return res.render("pages/login", { error: "Invalid credentials", user: null });
    }

    // store essential info in session (do not store password)
    req.session.user = { id: user.id, username: user.username, role: user.role, fullName: user.fullName };
    logger.info(`User logged in: ${user.username}`);
    return res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  req.session = null;
  res.redirect("/auth/login");
};
