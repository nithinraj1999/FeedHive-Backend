import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/jwt";


export interface AuthRequest extends Request {
  user?: any; 
}

 const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return 
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};


export default authenticateUser