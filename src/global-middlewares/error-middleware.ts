import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";

import * as Dto from "../dto";
import SystemConfig, { ServerEnvironments } from "../config";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response,
    next: (err: any) => NextFunction
  ) {
    const errorJsonString = JSON.stringify(error, (key, value) => {
      if (value instanceof Error) {
        const obj = {};

        Object.getOwnPropertyNames(value).forEach((key) => {
          obj[key] = value[key];
        });

        return obj;
      }

      return value;
    });

    console.error("Error encountered", errorJsonString);

    let httpStatus = 500;

    if (error instanceof Dto.ApplicationError) {
      httpStatus = (error as Dto.ApplicationError).HttpCode;
    }

    response.status(httpStatus);

    if (SystemConfig.environment === ServerEnvironments.PRODUCTION) {
      response.json({
        httpStatus,
        message:
          typeof error.message === "string"
            ? error.message
            : "Unexpected error encountered.",
      });
      return next(null);
    }

    const errorJsonObject = JSON.parse(errorJsonString);
    response.send({
      ...errorJsonObject,
    });
    return next(null);
  }
}
