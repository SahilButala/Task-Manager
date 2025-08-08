import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DatabaseConnection } from "./controllers/db/Database.js";
import { errorhandler } from "./utils/Errorhandler.js";
import router from "./routes/main.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//  data base connection
DatabaseConnection();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

// route
app.use("/api/v1", router);

// server
app.listen(PORT, (req, res) => {
  console.log(`Server running at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server running at port ${PORT}`);
  // throw new Error("sasasa")
});

// global error handaling
app.use(errorhandler);
