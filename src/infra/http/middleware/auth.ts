import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Jwt } from "../../../utils/jwt";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers["authorization"]?.split("bearer ")[1];
    if (!token) {
      return res.status(403).json({
        message: "token is required",
      });
    }
    const decodedToken = Jwt.verify(token);
    req.user = decodedToken;
    next();
  } catch {
    return res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}
