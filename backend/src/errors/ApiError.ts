export type errorType = {
  errors: string[];
  properties?: string[];
};

export class ApiError extends Error {
  public details?: any;

  constructor(message: string, details?: errorType) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "UnauthorizedError";
  }
}

export class InvalidCredentialsError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "InvalidCredentialsError";
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "ConflictError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "ForbiddenError";
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "BadRequestError";
  }
}

export class InvalidTokenError extends ApiError {
  constructor(message: string = "Invalid token") {
    super(message);
    this.name = "InvalidTokenError";
  }
}
