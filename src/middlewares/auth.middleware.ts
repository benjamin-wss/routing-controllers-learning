import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

import * as Dto from "../dto";

export class Auth implements ExpressMiddlewareInterface {
  use(
    request: Request,
    response: Response,
    next: (err: any) => NextFunction
  ): void {
    const headers = request.headers;

    if (headers["user-type"] === "authorized") {
      next(null);
      return;
    }

    const error = new Dto.ApplicationError({
      message: "Unauthorized",
      httpCode: 401,
    });

    next(error);
  }
}
