import { NextFunction, Request, Response } from "express";

export const AuthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "No autorizado" });
  try {
  } catch (error) {
    next(error);
  }
};
