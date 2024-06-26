import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";

export class AuthRoutes {
  static get routes() {
    const router = Router();

    const authDataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(authDataSource);
    const authController = new AuthController(authRepository);

    router.get("/refresh-token", authController.refreshToken);
    router.post("/register", authController.register);
    router.post("/login", authController.login);

    router.post("/forgot-password", (req, res) => {
      return res.json({ message: "Password recovery email sent" });
    });

    return router;
  }
}
