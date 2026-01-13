import { Request, Response } from "express";
import Task from "../models/Task";

export async function createTask(req: Request, res: Response) {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create task" });
  }
}

export async function getTasks(req: Request, res: Response) {
    const {sort, ...filters}= req.query;
    let mongoFilters: any = {...filters}
  try {
    if (filters.completed !== undefined){
      mongoFilters.completed = mongoFilters.completed==="true";
    }
    const sortValue = sort === 'asc' ? 1 : -1;

    const tasks = await Task.find(mongoFilters).sort({createdOn: sortValue})

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });}
      res.status(200).json(tasks);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const updated = await Task.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.status(201).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    await Task.findByIdAndDelete(req.params._id);
    res.status(201).json({ message: "successfuly deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete task" });
  }
}
