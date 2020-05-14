import { ValidationError } from "sequelize";

export const handleValidationError = (
  error: ValidationError
): { [key: string]: string[] } => {
  let messages: { [key: string]: string[] } = {};
  for (const err of error.errors) {
    if (messages[err.path]) {
      messages[err.path].push(err.message);
    } else {
      messages[err.path] = [err.message];
    }
  }

  return messages;
};
