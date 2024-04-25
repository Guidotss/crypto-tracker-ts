import { hash, compare } from "bcrypt";

export class BcryptAdapter {
  static async hashPassword(password: string, salt = 12): Promise<string> {
    return hash(password, salt);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
