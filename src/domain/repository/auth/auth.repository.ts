import { LoginDto, RegisterDto } from "../../dtos";
import { UserEntity } from "../../entities";

export abstract class AuthRepository {
  abstract register(newUserData: RegisterDto): Promise<UserEntity>;
  abstract login(userData: LoginDto): Promise<UserEntity>;
  abstract getUserById(id: string): Promise<UserEntity | null>;
  abstract forgotPassword(email: string): Promise<UserEntity>;
}
