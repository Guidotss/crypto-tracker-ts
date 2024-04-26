import jwt from "jsonwebtoken";

export class JsonWebTokenAdapter {
  static async sign(
    payload: any,
    secret: string,
    expiresIn = "1h"
  ): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
        if (err) reject(err as Error);
        resolve(token);
      });
    });
  }

  static async verify<T>(
    token: string,
    secret: string
  ): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err as Error);
        resolve(decoded as T);
      });
    });
  }
}
