import {
  AuthDataSource,
  AuthRepository,
  LoginDto,
  RegisterDto,
  UserEntity,
} from "../../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource){}
  register(newUserData: RegisterDto): Promise<UserEntity> {
    return this.authDataSource.register(newUserData);
  }
  login(userData: LoginDto): Promise<UserEntity> {
    return this.authDataSource.login(userData);
  }
  forgotPassword(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
