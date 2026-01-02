import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./utils/db.js";
import TaskRouter from "./routes/task.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/task", TaskRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start failed:", error.message);
    process.exit(1);
  }
};

startServer();
