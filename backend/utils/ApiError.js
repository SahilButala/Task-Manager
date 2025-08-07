export class ApiError extends Error {
  constructor(status = 404, message) {
    super(message);
    this.status = status;
  }
}
