import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import HttpStatus from "../configs/http.config";
import env from "../configs/env.config";
import notFoundMiddleware from "../middlewares/notFound.middleware";
import errorMiddleware from "../middlewares/error.middleware";
import router from "../routes/user.route";

class App {
  public readonly express: Application;

  public constructor() {
    this.express = express();
    this.setupApplicationMiddlewares();
    this.setupApplicationSecurities();
    this.setupApplicationHealth();
    this.setupApplicationRoutes();
  }

  private setupApplicationMiddlewares(): void {
    this.express.use(express.json({ limit: "10kb" }));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(morgan("dev"));
  }

  private setupApplicationSecurities(): void {
    this.express.use(
      cors({
        origin: env.origin,
        credentials: true,
      })
    );
    this.express.use(helmet());
  }

  private setupApplicationHealth(): void {
    this.express.get("/health", (req: Request, res: Response) => {
      res.status(HttpStatus.OK).json({
        status: "OK",
        message: "Server is healthy",
      });
    });
  }

  private setupApplicationRoutes(): void {
    this.express.use(env.basePath, router)

    this.express.use(notFoundMiddleware.handle);
    this.express.use(errorMiddleware.handle);
  }
}

export default App;
