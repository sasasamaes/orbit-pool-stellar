import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

// Import routes
import groupRoutes from "./routes/groups";
import contributionRoutes from "./routes/contributions";
import userRoutes from "./routes/users";
import invitationRoutes from "./routes/invitations";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

const app: Application = express();
const PORT = process.env.PORT || 5001;

// Initialize Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Rate limiting - More generous limits for development
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "1000"), // Increased to 1000 for development
  message: "Too many requests from this IP, please try again later.",
  skip: (req) => process.env.NODE_ENV === "development", // Skip rate limiting in development
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"]
        : ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(compression());
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", limiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/contributions", contributionRoutes);
app.use("/api/invitations", invitationRoutes);

// API documentation
app.get("/api", (req, res) => {
  res.json({
    name: "Community Wallet API",
    version: "1.0.0",
    description: "API for Community Wallet - Group Savings Platform",
    endpoints: {
      users: "/api/users",
      groups: "/api/groups",
      contributions: "/api/contributions",
      invitations: "/api/invitations",
      health: "/health",
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
  logger.info(
    `🌐 CORS enabled for: ${process.env.NODE_ENV === "production" ? "production domains" : "localhost:3000"}`
  );
});

export default app;
