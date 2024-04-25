import { userModel } from "../../../data/mongo";
import { CustomError, UserEntity, UsersDataSource } from "../../../domain";

export class UsersDataSourceImpl implements UsersDataSource {
  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await userModel.findFirst({
        where: {
          email,
        },
      });
      return user;
    } catch (error: unknown) {
      throw CustomError.internal((error as Error).message);
    }
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    try {
      const user = await userModel.findFirst({
        where: {
          id,
        },
      });
      return user;
    } catch (error: unknown) {
      throw CustomError.internal((error as Error).message);
    }
  }
}
