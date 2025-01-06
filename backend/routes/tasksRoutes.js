import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import express from "express";

const taskRoutes = express.Router();

taskRoutes.get("/tasks", getAllTasks);
taskRoutes.get("/tasks/:id", getTaskById);
taskRoutes.post("/tasks", createTask);
taskRoutes.put("/tasks/:id", updateTask);
taskRoutes.delete("/tasks/:id", deleteTask);

export default taskRoutes;
