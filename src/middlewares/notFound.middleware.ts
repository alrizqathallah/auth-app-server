import { Request, Response, NextFunction } from "express";

import HttpStatus from "../configs/http.config";
import AppError from "../configs/error.config";

class NotFoundMiddleware {
  public handle(_req: Request, _res: Response, next: NextFunction): void {
    const error = new AppError(
      `Cannot find ${_req.originalUrl} on this server`,
      HttpStatus.NOT_FOUND
    );
    next(error);
  }
}

export default new NotFoundMiddleware();
