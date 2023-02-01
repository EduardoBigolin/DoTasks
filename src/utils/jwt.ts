import CONFIG from "../../config";
import jwt from "jsonwebtoken";

export class Jwt {
  static create(name: string, email: string, userID: number) {
    const payLoad = {
      userID,
      email,
      name,
    };

    return jwt.sign(payLoad, CONFIG.JWT_KEY);
  }
  static verify(token: string) {
    return jwt.verify(token, CONFIG.JWT_KEY) as jwt.JwtPayload;
  }
}
