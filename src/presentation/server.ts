import express, { Router } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

interface ServerOptions {
  port: number;
  router: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly router: Router;
  constructor(private readonly options: ServerOptions) {
    this.port = options.port;
    this.router = options.router;
  }

  public start(): void {
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use("/api/v1", this.router);
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
