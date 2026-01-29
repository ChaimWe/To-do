import {Request} from "express"
import { ITask } from "../models/Task.js";
export interface JwtUser{
    id: string,
    name: string,
    role: "user" | "admin"
} 
export interface AuthenticatedRequest extends Request {
  user?: JwtUser;
  task?: ITask;
}