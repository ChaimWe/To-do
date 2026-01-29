import { JwtUser } from "../auth/interfaces.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}