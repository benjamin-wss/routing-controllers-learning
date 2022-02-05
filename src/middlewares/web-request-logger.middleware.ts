import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

@Middleware({ type: "before" })
export class WebRequestLogger implements ExpressMiddlewareInterface {
  use(
    request: Request,
    response: Response,
    next: (err: any) => NextFunction
  ): void {
    const headers = request.headers;

    const requestLog = {
      headers,
    };

    console.log(requestLog);

    next(null);
  }
}
