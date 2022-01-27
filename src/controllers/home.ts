import { Controller, Get, HttpCode, Res } from "routing-controllers";
import { Response } from "express";
import "reflect-metadata";

@Controller("/")
export default class HomeController {
  @Get("/")
  @HttpCode(200)
  index(@Res() response: Response) {
    const payload = {
      message: "Ah La Vache, ze server is running !!",
    };

    return response.json(payload);
  }
}
