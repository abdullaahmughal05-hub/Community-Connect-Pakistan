
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import path from "node:path";
import mongoose from "mongoose";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import organizationRoutes from "./routes/organizationRoutes";

import {
  protectAdmin,
  AuthRequest,
} from "./middleware/authMiddleware";

import {
  requestLogger,
  getApiLogs,
  getApiStats,
} from "./monitoring/requestLogger";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      process.env.ADMIN_URL || "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded organization photos
app.use(
  "/uploads",
  express.static(path.resolve(process.cwd(), "uploads"))
);

// API request monitoring
app.use(requestLogger);

// Backend monitoring dashboard
app.get("/", (_req, res) => {
  res.sendFile(
    path.resolve(process.cwd(), "public", "monitoring.html")
  );
});

// Health check
app.get("/api/health", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    message: "Backend is working successfully!",
    project: "Community Connect Pakistan",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: databaseConnected ? "Connected" : "Disconnected",
      name: mongoose.connection.name,
    },
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Organization routes
app.use("/api/organizations", organizationRoutes);

// Protected monitoring endpoints
app.get(
  "/api/monitoring/logs",
  protectAdmin,
  (_req: AuthRequest, res) => {
    res.json({
      success: true,
      logs: getApiLogs(),
    });
  }
);

app.get(
  "/api/monitoring/stats",
  protectAdmin,
  (_req: AuthRequest, res) => {
    res.json({
      success: true,
      stats: getApiStats(),
      server: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
      },
    });
  }
);

// Protected admin test route
app.get(
  "/api/admin/dashboard",
  protectAdmin,
  (req: AuthRequest, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the protected admin dashboard!",
      admin: req.admin,
    });
  }
);

// Handle upload errors
app.use(
  (
    error: Error & { code?: string },
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.headersSent) {
      return next(error);
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image must be smaller than 5 MB.",
      });
    }

    if (error.message.includes("Only JPG, PNG and WEBP")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Backend error:", error);

    return res.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
    });
  }
);

// Start server after database connection
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("----------------------------------------");
    console.log(" COMMUNITY CONNECT PAKISTAN BACKEND");
    console.log("----------------------------------------");
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Monitoring: http://localhost:${PORT}/`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
    console.log(`Uploads: http://localhost:${PORT}/uploads`);
    console.log("----------------------------------------");
  });
};

startServer();
