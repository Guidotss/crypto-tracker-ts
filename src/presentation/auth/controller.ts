import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  LoginDto,
  LoginUseCase,
  RegisterDto,
  RegisterUseCase,
} from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res
        .header("Content-Type", "application/json")
        .status(error.statusCode)
        .json({
          ok: false,
          error: error.message,
        });
    }
  };

  public register = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.fromRequest(req.body);
    if (error) {
      throw CustomError.badRequest(error);
    }
    new RegisterUseCase(this.authRepository)
      .execute(registerDto!)
      .then((response) => res.json(response))
      .catch((error) => this.handleError(error, res));
  };

  public login = async (req: Request, res: Response) => {
    const [error, loginDto] = LoginDto.fromRequest(req.body);
    if (error) {
      throw CustomError.badRequest(error);
    }
    new LoginUseCase(this.authRepository)
      .execute(loginDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
