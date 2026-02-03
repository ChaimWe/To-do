import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import adminRoutes from "./routes/adminRoutes.js";
import { AuthenticateToken } from "./auth/AuthenticateToken.js";
import { RequireAdmin } from "./auth/RequireAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load env reliably regardless of process CWD (e.g. started from repo root)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS?.split(",").map(origin => origin.trim().replace(/^['"]|['"]$/g, ""));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/tasks", AuthenticateToken, taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", AuthenticateToken, RequireAdmin, adminRoutes);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  },
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Mongo connected");
    console.log("Mongo DB:", mongoose.connection.name);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
