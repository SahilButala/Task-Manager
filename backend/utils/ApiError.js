export class ApiError extends Error {
  constructor(status = 404, message , stack = null) {
    super(message);
    this.status = status;
    this.stack = stack

     Error.captureStackTrace(this, this.constructor);
  }

    toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
      stack: this.stack,
    };
  }
}
