import jwt from "jsonwebtoken";

export class JsonWebTokenAdapter {
  static async Sign(
    payload: object,
    secret: string,
    expiresIn= "1h"
  ): Promise<string | undefined> {
    console.log(expiresIn); 
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  static async Verify<T>(
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
