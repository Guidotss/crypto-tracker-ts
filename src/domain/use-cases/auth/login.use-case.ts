import { JsonWebTokenAdapter, envs } from "../../../config";
import { LoginDto } from "../../dtos";
import { AuthRepository } from "../../repository";
import { Sign } from "../../types";

interface CustomResponse {
  ok: boolean;
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    lastName: string;
  };
}
interface ILoginUseCase {
  execute(loginDto: LoginDto): Promise<CustomResponse>;
}

export class LoginUseCase implements ILoginUseCase {
  private readonly jwtSecret = envs.JWT_SECRET;
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sign: Sign = JsonWebTokenAdapter.sign
  ) {}

  async execute(loginDto: LoginDto): Promise<CustomResponse> {
    const user = await this.authRepository.login(loginDto);
    const token = await this.sign(user.id, this.jwtSecret);
    if (!token) throw new Error("Error generating token");

    return {
      ok: true,
      message: "User logged in",
      token,
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      },
    };
  }
}
