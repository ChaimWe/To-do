import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./interfaces.js";

export default function authorize(policy: (req: AuthenticatedRequest)=> Promise<boolean>|boolean){
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
        const allowed = await policy(req);
        if (!allowed) return res.status(403).json({message: "Forbidden"});
        next()
    }
}