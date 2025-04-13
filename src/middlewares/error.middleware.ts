import { Request, Response, NextFunction } from "express";

import AppError from "../configs/error.config";
import HttpStatus from "../configs/http.config";

class ErrorMiddleware {
  public handle(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const status = err.status || "error";

    res.status(statusCode).json({
      status,
      message: err.message || "Something went wrong",
    });
  }
}

export default new ErrorMiddleware();
