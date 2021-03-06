import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

export class Pre implements ExpressMiddlewareInterface {
  use(
    request: Request,
    response: Response,
    next: (err: any) => NextFunction
  ): void {
    console.log("Premature, PE, as always.");
    next(null);
  }
}
