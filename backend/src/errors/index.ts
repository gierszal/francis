export class ApiError extends Error {
  public details?: any; // может понадобится

  constructor(message: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any[]) {
    super(message);
    this.details = details;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any[]) {
    super(message);
    this.details = details;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, details?: any[]) {
    super(message);
    this.details = details;
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: any[]) {
    super(message);
    this.details = details;
  }
}
