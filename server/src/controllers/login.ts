import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function login(req: Request, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({
      message: "Server misconfigured: JWT_SECRET is not configured",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const isProd = process.env.NODE_ENV === "production";

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/",
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}
