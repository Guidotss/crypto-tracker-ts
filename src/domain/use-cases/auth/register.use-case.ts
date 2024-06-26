import { RegisterDto, AuthRepository, CustomError } from "../../";
import { JsonWebTokenAdapter, envs } from "../../../config";
import { Sign } from "../../types";

interface CustomResponse {
  ok: boolean;
  message: string;
  token: string;
  user: {
    name: string;
    lastName: string;
    email: string;
  };
}

interface IRegisterUseCase {
  execute(registerDto: RegisterDto): Promise<CustomResponse>;
}

export class RegisterUseCase implements IRegisterUseCase {
  private readonly jwtSecret = envs.JWT_SECRET;
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sing: Sign = JsonWebTokenAdapter.Sign
  ) {}
  async execute(registerDto: RegisterDto): Promise<CustomResponse> {
    const user = await this.authRepository.register(registerDto);
    const token = await this.sing({ _id: user.id }, this.jwtSecret);
    if (!token) throw CustomError.internal("Error generating token");

    return {
      ok: true,
      message: "User registered successfully",
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }
}
