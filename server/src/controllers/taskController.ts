import { Request, Response } from "express";
import Task from "../models/Task.js";
import { AuthenticatedRequest } from "../auth/interfaces.js";
import { isAdmin } from "../auth/policies.js";

export async function createTask(req: AuthenticatedRequest, res: Response) {
  try {
    const taskData = { ...req.body, owner: req.user!.id };
    const task = await Task.create(taskData);
    return res.status(201).json(task);
  } catch (err) {
    console.error("Create Task error: ", err);
    return res.status(500).json({ message: "Unable to create task" });
  }
}

export async function getTasks(req: AuthenticatedRequest, res: Response) {
  const { sort, ...filters } = req.query;
  let mongoFilters: any = isAdmin(req)?{ }:{owner: req.user!.id}
  try {
    if (filters.completed !== undefined) {
      mongoFilters.completed = filters.completed === "true";
    }
    const sortValue = sort === "asc" ? 1 : -1;
    const tasks = await Task.find(mongoFilters).sort({ createdOn: sortValue });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export async function updateTask(req: AuthenticatedRequest, res: Response) {
  try {
    const task = (req as any).task;
    const updated = await Task.findByIdAndUpdate(task._id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update task" });
  }
}

export async function deleteTask(req: AuthenticatedRequest, res: Response) {
  try {
    await Task.findByIdAndDelete(req.params._id);
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to delete task" });
  }
}
