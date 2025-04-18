export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public isOperational: boolean;

  public constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
