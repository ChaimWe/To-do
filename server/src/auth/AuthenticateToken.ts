import { Response, NextFunction } from "express";
import { AuthenticatedRequest, JwtUser } from "./interfaces.js";
import jwt from "jsonwebtoken";

export function AuthenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUser;
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Authentication error: ", err);
    return res.status(401).json({ message: "Expired or invalid token" });
  }
}
