import { Response } from "express";
import { sendErrorResponse } from "./response";
import { ForeignKeyConstraintError, ValidationError } from "sequelize";

class CustomError extends Error {
  readonly statusCode!: number;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  readonly statusCode = 404;

  constructor(message: string = "Not found") {
    super(message);
  }
}

export class AuthenticationError extends CustomError {
  readonly statusCode = 401;

  constructor(message: string = "Unauthenticated") {
    super(message);
  }
}

export class AuthorizationError extends CustomError {
  readonly statusCode = 403;

  constructor(message: string = "Unauthorized") {
    super(message);
  }
}

export class UnknownError extends CustomError {
  readonly statusCode = 500;

  constructor(message: string = "Internal server error") {
    super(message);
  }
}

export const handleError = (res: Response, error: Error) => {
  let message = error.message;

  if (error instanceof ForeignKeyConstraintError) {
    message = "Invalid data, please try again.";
  }

  if (error instanceof ValidationError) {
    let messages: { [key: string]: string[] } = {};
    for (const err of error.errors) {
      if (messages[err.path]) {
        messages[err.path].push(err.message);
      } else {
        messages[err.path] = [err.message];
      }
    }

    message = messages as any;
  }

  sendErrorResponse(res, message, (error as any).statusCode);
};
