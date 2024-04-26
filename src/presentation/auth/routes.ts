import { Router } from "express";
import { AuthController } from "./controller";
import {
  AuthDataSourceImpl,
  AuthRepositoryImpl,
} from "../../infraestructure";

export class AuthRoutes {
  static get routes() {
    const router = Router();
    
    const authDataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(authDataSource);

    const authController = new AuthController(authRepository);

    router.post("/login", (req, res) => {
      return res.json({ message: "User logged in" });
    });

    router.post("/forgot-password", (req, res) => {
      return res.json({ message: "Password recovery email sent" });
    });

    return router;
  }
}
