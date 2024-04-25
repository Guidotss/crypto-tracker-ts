import { Router } from "express";

export class AuthRoutes {
  static get routes() {
    const router = Router();

    router.post("/register", (req, res) => {
      return res.json({ message: "User registered" });
    });

    router.post("/login", (req, res) => {
      return res.json({ message: "User logged in" });
    });

    router.post("/forgot-password", (req, res) => {
      return res.json({ message: "Password recovery email sent" });
    });

    return router;
  }
}
