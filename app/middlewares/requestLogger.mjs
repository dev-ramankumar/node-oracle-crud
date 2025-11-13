import { logger } from "../utils/logger.mjs";

export default function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
}
