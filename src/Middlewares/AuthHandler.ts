import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.env";
export const AuthHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const decodedToken = jwt.verify(token, JWT_SECRET || "") as {
      userId: string;
    };
    req.body.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
