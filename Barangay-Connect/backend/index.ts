import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { validateEnv } from "./config/env";
import authRoutes from "./routes/auth";
import incidentRoutes from "./routes/incidents";
import documentRoutes from "./routes/documents";
import adminRoutes from "./routes/admin";
import smsRoutes from "./routes/sms";
import pollRoutes from "./routes/polls";
import notificationRoutes from "./routes/notifications";
import announcementRoutes from "./routes/announcements";
import statsRoutes from "./routes/stats";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
validateEnv();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const NODE_ENV: string = process.env.NODE_ENV || "development";

app.set("strict routing", false);

// CORS
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200",
      "capacitor://localhost",
      "ionic://localhost",
      "file://",
      process.env.FRONTEND_URL || "",
      "https://barangay-connect.joalvergs.tech",
    ].filter(Boolean);

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/stats", statsRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "BarangayConnect Hub API Server",
    version: "2.0.0",
    status: "running",
    database: "Supabase",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      incidents: "/api/incidents",
      documents: "/api/documents",
      admin: "/api/admin",
      sms: "/api/sms",
      polls: "/api/polls",
      notifications: "/api/notifications",
      announcements: "/api/announcements",
      stats: "/api/stats/public",
    },
  });
});

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "BarangayConnect Hub API Server",
    version: "2.0.0",
    status: "running",
    database: "Supabase",
  });
});

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is running", version: "2.0.0" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Server error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Shutting down...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
