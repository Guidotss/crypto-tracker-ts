import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterDto } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

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

  public register = async (req: Request, res: Response) => {
    try {
      const [error, registerDto] = RegisterDto.fromRequest(req.body);
      if (error) {
        throw CustomError.badRequest(error);
      }
      const newUser = await this.authRepository.register(registerDto!); //TODO: Change this for a real implementation of the register method with register use-case
      res.json({
        ok: true,
        message: "User registered",
        user: newUser,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
