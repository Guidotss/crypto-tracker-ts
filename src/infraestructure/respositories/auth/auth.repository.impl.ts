import {
  AuthDataSource,
  AuthRepository,
  LoginDto,
  RegisterDto,
  UserEntity,
} from "../../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  register(newUserData: RegisterDto): Promise<UserEntity> {
    return this.authDataSource.register(newUserData);
  }
  login(userData: LoginDto): Promise<UserEntity> {
    return this.authDataSource.login(userData);
  }
  getUserById(id: string): Promise<UserEntity | null> {
    return this.authDataSource.getUserById(id);
  }
  forgotPassword(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
