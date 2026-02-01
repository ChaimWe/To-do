import express from "express";
import { deleteTask, updateTask, createTask, getTasks } from "../controllers/taskController.js";
import { AuthenticateToken } from "../auth/AuthenticateToken.js";
import { isOwnerOrAdmin } from "../auth/policies.js";
import authorize from "../auth/authorize.js";

const taskRoutes = express.Router()

taskRoutes.post("/create-task", createTask);

taskRoutes.get("/", getTasks);

taskRoutes.put("/task/:_id", authorize(isOwnerOrAdmin), updateTask);

taskRoutes.delete("/task/:_id", authorize(isOwnerOrAdmin), deleteTask);

export default taskRoutes;