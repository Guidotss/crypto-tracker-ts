import { LoginDto, RegisterDto, UserEntity } from "../../";

export abstract class AuthDataSource {
  abstract register(newUserData: RegisterDto): Promise<UserEntity>;
  abstract login(userData: LoginDto): Promise<UserEntity>;
  abstract forgotPassword(email: string): Promise<UserEntity>;
}
