import { JsonWebTokenAdapter, envs } from "../../../config";
import { AuthRepository, RefreshTokenDto, CustomError } from "../../";
import { TokenData, Verify } from "../../types";

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

interface IRefreshTokenUseCase {
  execute(refreshToken: RefreshTokenDto): Promise<CustomResponse>;
}

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly veryfyToken: Verify = JsonWebTokenAdapter.Verify,
    private readonly secret = envs.JWT_SECRET
  ) {}
  async execute({ refreshToken }: RefreshTokenDto): Promise<CustomResponse> {
    const { _id } = await this.veryfyToken<TokenData>(refreshToken, this.secret);
    console.log(_id); 
    if (!_id) {
      throw CustomError.unauthorized("Invalid token");
    }
    const user = await this.authRepository.getUserById(_id);
    if (!user) {
      throw CustomError.notFound("User not found");
    }
    const token = await JsonWebTokenAdapter.Sign({ _id: user.id }, this.secret);
    if (!token) {
      throw CustomError.internal("Error signing token");
    }

    return {
      ok: true,
      message: "Token refreshed",
      token,
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      },
    };
  }
}
