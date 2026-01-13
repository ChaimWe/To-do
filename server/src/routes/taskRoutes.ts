import express from "express";
import { deleteTask, updateTask, createTask, getTasks } from "../controllers/taskController";

const router = express.Router()

router.post("/create-task", createTask);

router.get("/tasks", getTasks);

router.patch("/task/:_id", updateTask);

router.delete("/task/:_id", deleteTask);

export default router;