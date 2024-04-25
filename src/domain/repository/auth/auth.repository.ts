import { LoginDto, RegisterDto } from "../../dtos";
import { UserEntity } from "../../entities";

export abstract class AuthRepository {
  abstract register(newUserData: RegisterDto): Promise<UserEntity>;
  abstract login(userData: LoginDto): Promise<UserEntity>;
  abstract forgotPassword(email: string): Promise<UserEntity>;
}
