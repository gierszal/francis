export class ApiError extends Error {
  public statusCode: number;
  public details?: any;
  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400);
    this.details = details;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 404);
    this.details = details;
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 409);
    this.details = details;
  }
}
