import { Response } from "express";
import { AuthenticatedRequest } from "../auth/interfaces.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

export async function getUsers(req: AuthenticatedRequest, res: Response){
    try{
        const users = await User.find().select("-password");
        res.status(200).json(users);
    }catch(err){
        console.error("Get users error", err);
        res.status(500).json({message: "Unable to get users"});
    }
};

export async function getUserTasks(req: AuthenticatedRequest, res: Response){
    try{
        const userTasks = await Task.find({owner: req.params._id});
        res.status(200).json(userTasks)
    }catch(err){
        console.log("User task error: ", err);
        res.status(500).json({message: "Error"})
    };
};

export async function editUser(req: AuthenticatedRequest, res:Response){
    try{
        const updated = await User.findByIdAndUpdate(req.params._id , req.body, {new: true});
        res.status(200).json(updated);
    }catch(err){
        console.error("User editing error: ",err);
        res.status(500).json({message:"Unable to edit user"})
    }
};

export async function deleteUser(req: AuthenticatedRequest, res: Response){
    try{
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json({message: "User deleted successfully"})
    }catch(err){
        console.error("Delete user error: ", err);
        res.status(500).json({message: "Unable to delete user"})
    }
}