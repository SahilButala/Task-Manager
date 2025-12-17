import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import router from "./routes/main";
import { initSocket } from "./sockets/socket";
import { errorhandler } from "./utils/Errorhandler";
import { DatabaseConnection } from "./controllers/db/Database";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

// ===============================
// Database Connection
// ===============================
DatabaseConnection();

// ===============================
// Middlewares
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());

// ===============================
// Routes
// ===============================
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(`Server running at port ${PORT}`);
});

// ===============================
// Global Error Handler
// ===============================
app.use(errorhandler);

// ===============================
// HTTP + Socket Server
// ===============================
const server = http.createServer(app);

// initialize socket AFTER app setup
initSocket(server);

// start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at port ${PORT}`);
});
