import { Request, Response } from "express";
import { AuthRepository, CustomError, LoginDto, RegisterDto } from "../../domain";

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

  public login = async (req: Request, res: Response) => {
    try { 
      const [ error, loginDto ] = LoginDto.fromRequest(req.body); 
      if(error){ 
        throw CustomError.badRequest(error); 
      }
      const user = await this.authRepository.login(loginDto!); //TODO: Change this for a real implementation of the login method with login use-case
      res.json({ 
        ok: true, 
        message: "User logged in", 
        user: user 
      });
    }catch(error){ 
      this.handleError(error, res);
    }
  }
}
