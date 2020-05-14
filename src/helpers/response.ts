import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: Object[] | Object | null = null,
  status: number = 200
) => {
  return res.status(status).json({
    success: true,
    message: message,
    data: data
  });
};

export const sendErrorResponse = (
  res: Response,
  message: string | string[] | Object | Object[],
  status: number = 400
) => {
  return res.status(status).json({
    success: false,
    message: message,
    error_code: status
  });
};
