import express from "express";
import { completeTask, createTask, deleteTask, getTasks, updateTask } from "../controller/task.controller.js";


const TaskRouter = express.Router();

TaskRouter.post("/", createTask);
TaskRouter.get("/", getTasks);
TaskRouter.put("/:id", updateTask);
TaskRouter.delete("/:id", deleteTask);
TaskRouter.patch("/:id/complete", completeTask);

export default TaskRouter;
