import { logger } from "../utils/logger.mjs";

export function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message || err);
  const status = err.status || 500;
  if (req.accepts("html")) {
    return res.status(status).render("pages/error", { error: err });
  }
  res.status(status).json({ success: false, message: err.message || "Internal Server Error" });
}
