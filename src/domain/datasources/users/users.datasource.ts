import { UserEntity } from "../../entities";

export abstract class UsersDataSource {
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  abstract getUserById(id: string): Promise<UserEntity | null>;
}
