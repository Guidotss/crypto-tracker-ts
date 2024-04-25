import { userModel } from "../../../data/mongo";
import { BcryptAdapter } from "../../../config";
import {
  AuthDataSource,
  CustomError,
  LoginDto,
  RegisterDto,
  UserEntity,
  UsersRepository,
} from "../../../domain";

type HashPassword = (password: string, salt: number) => Promise<string>;
type ComparePassword = (
  password: string,
  hashedPassword: string
) => Promise<boolean>;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashPassword = BcryptAdapter.hashPassword,
    private readonly comparePassword: ComparePassword = BcryptAdapter.comparePassword,
    private readonly usersRepository: UsersRepository
  ) {}

  async register(newUserData: RegisterDto): Promise<UserEntity> {
    const { name, lastName, email, password } = newUserData;
    const checkUser = await this.usersRepository.getUserByEmail(email);
    if (checkUser) {
      throw CustomError.badRequest("User already exists");
    }
    const hashedPassword = await this.hashPassword(password, 12);
    const user = await userModel.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
  async login(userData: LoginDto): Promise<UserEntity> {
    const { email, password } = userData;
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw CustomError.unauthorized("Invalid email or password");
    }
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw CustomError.unauthorized("Invalid email or password");
    }

    return user;
  }
  forgotPassword(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
