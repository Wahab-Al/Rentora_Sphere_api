import jwt from "jsonwebtoken";
import type { accountTypeValues } from "../users/domain/user_interface.js";
/**
 * Application-specific JWT payload structure
 */
interface appJWTPayload {
  user_id: string;
  accountType: accountTypeValues;
}

export class AuthenticateService {
  // define secret key
  private static readonly SECRET = process.env.JWT_SECRET_KEY as string
  /**
   * 
   * @param prop object containing app identifiction and roles
   * @returns JWT token string valid for 15 minutes
   */
  static generateToken(prop: appJWTPayload) {
    return jwt.sign(prop, this.SECRET, { expiresIn: '15m' })
  }

  /**
   * 
   * @param token JWT token string 
   * @returns Decoded payload if token is valid
   */
  static verifyToken(token: string) {
    return jwt.verify(token, this.SECRET) as appJWTPayload;
  }

}