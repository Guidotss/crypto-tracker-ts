import { UserEntity } from "../../../domain";
import { UsersRepository } from "../../../domain/repository/users/users.repository";
import { UsersDataSource } from "../../../domain/datasources/users/users.datasource";

export class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly UsersDataSource: UsersDataSource) {}
  getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.UsersDataSource.getUserByEmail(email);
  }
  getUserById(id: string): Promise<UserEntity | null> {
    return this.UsersDataSource.getUserById(id);
  }
}
