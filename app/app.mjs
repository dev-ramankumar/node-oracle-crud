import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import cookieSession from "cookie-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import router from "./routes/index.mjs";
import requestLogger from "./middlewares/requestLogger.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";

// fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Tell Express where the views folder is (one level up from /app)
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");

// middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "devsecret"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
  })
);

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", router);

// error handler
app.use(errorHandler);

export default app;
