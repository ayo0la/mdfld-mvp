import pkg from "jsonwebtoken";
import type { StringValue } from "ms";
const { sign, verify } = pkg;
import { v4 } from "uuid";

interface TJWT {
  email: string;
}

class TokenUtility {
  static generateAccessToken(
    data: TJWT,
    tokenExpiry: StringValue = "2h",
    secretKey?: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        {
          email: data.email,
          id: v4(),
        },
        secretKey || (process.env.ACCESS_TOKEN as string),
        { expiresIn: tokenExpiry },
        (error, signedToken) => {
          if (error) {
            reject(error);
          } else {
            resolve(signedToken as string);
          }
        }
      );
    });
  }
  static verifyToken(token: string, secretKey?: string): Promise<TJWT | null> {
    return new Promise((resolve, reject) => {
      verify(
        token,
        secretKey || (process.env.ACCESS_TOKEN as string),
        (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded as TJWT);
          }
        }
      );
    });
  }
}

export default TokenUtility;
