export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Maintains proper stack trace (V8)
    Error.captureStackTrace(this, this.constructor);
  }
}
