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

export class EmailServiceError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "EmailServiceError";
  }
}

export class FileServiceError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "FileServiceError";
  }
}

export class LLMApplicationError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "LLMApplicationError";
  }
}

export class DatabaseError extends ApiError {
  constructor(message: string, details?: errorType) {
    super(message);
    this.details = details;
    this.name = "DatabaseError";
  }
}
