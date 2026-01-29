import { Request, Response } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    // Avoid cryptic jsonwebtoken runtime error: "secretOrPrivateKey must have a value"
    return res.status(500).json({
      message: "Server misconfigured: JWT_SECRET is not configured",
    });
  }

  const { name, email, password, role } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required field(s): ${missingFields.join(", ")}`,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }
  try {
    const user = new User({ name, email, password, role: "user" });
    await user.save();

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
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Registration error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}
