import express from 'express';
import { login } from '../controllers/login.js';
import { register } from '../controllers/registration.js';
import { AuthenticateToken } from '../auth/AuthenticateToken.js';

const userRoutes = express.Router();



userRoutes.post("/login", login);
userRoutes.post("/logout", (req, res)=>{
  res.clearCookie("token",  {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"}).json({message:"Logged out successfully"})
});

userRoutes.post("/register", register);
userRoutes.get("/me", AuthenticateToken, (req, res) => {
  res.json({
    id: req.user!.id,
    name: req.user!.name,
    role: req.user!.role,
  });
});
export default userRoutes;