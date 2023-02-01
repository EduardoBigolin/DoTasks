import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Jwt, PayLoad } from "../../../utils/jwt";

declare global {
  namespace Express {
    export interface Request {
      user: PayLoad;
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).json({
        message: "token is required",
      });
    }
    const decodedToken = Jwt.verify(token);

    req.user = decodedToken;
    next();
  } catch (error: any) {
    return res.status(401).json({
      message: "Invalid request!",
    });
  }
}
