import { AuthenticatedRequest, JwtUser } from "./interfaces.js";
import Task from "../models/Task.js";

export const isAdmin = (req: AuthenticatedRequest) =>
  req.user!.role === "admin";


export const isTaskOwner = async (req: AuthenticatedRequest) => {
  const task = await Task.findById(req.params._id);
  if (!task) return false;
  req.task = task;
  return task.owner.toString() === req.user!.id;
};

export const isOwnerOrAdmin = async (req: AuthenticatedRequest) => {
  const task = await Task.findById(req.params._id);
  if (!task) return false;
  req.task = task;
  return isAdmin(req) || task.owner.toString() === req.user!.id;
};