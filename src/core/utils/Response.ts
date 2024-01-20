import { Response } from "express";

export const HttpResponse = (
  res: Response,
  httpcode: 200,
  message: string,
  data: object | string | undefined
) => {
  return res.status(httpcode).json({
    statusCode: httpcode,
    message,
    data,
  });
};
