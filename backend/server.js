import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";
import cors from "cors"
import TaskRouter from "./routes/task.route.js";

dotenv.config();


connectDB();


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/task/", TaskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});