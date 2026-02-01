import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./interfaces.js";
import { isAdmin } from "./policies.js";

export function RequireAdmin(req: Request, res: Response, next: NextFunction){
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) return res.status(401).json({message: "Not authenticated"});
    if (!isAdmin(authReq)) return res.status(403).json({message: "Forbidden. Admin only"});
    next()
}