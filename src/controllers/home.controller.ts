import {
  Get,
  HttpCode,
  JsonController,
  Res,
  UseBefore,
} from "routing-controllers";
import { Response } from "express";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import "reflect-metadata";
import { IsString } from "class-validator";

import * as Dto from "../dto";
import * as Middlewares from "../middlewares";

interface IHeartBeatResponse {
  message: string;
}

class HeartBeatResponse {
  @IsString()
  public message: string;
}

@JsonController("")
export default class HomeController {
  @OpenAPI({
    description: "A simple endpoint to check if the API server is running.",
  })
  @ResponseSchema("HeartBeatResponse", {
    description: "Heartbeat response.",
    statusCode: 200,
    // contentType: "application/json",
    isArray: false,
  })
  @Get("/")
  @HttpCode(200)
  Index(@Res() response: Response): Response<IHeartBeatResponse> {
    // const payload: IHeartBeatResponse = {
    //   message: "Ah La Vache, ze server is running !!",
    // };
    const payload = new HeartBeatResponse();
    payload.message = "Ah La Vache, ze server is running !!";

    return response.json(payload);
  }

  @Get("/unexpected-error-testing")
  ErrorTester() {
    const error = new Error("unexpected error happening mou.");
    throw error;
  }

  @Get("/expected-error-testing")
  ExpectedErrorTester() {
    const error = new Dto.ApplicationError({
      message: "Expected error mou.",
      httpCode: 505,
    });

    throw error;
  }

  @OpenAPI({
    description: "Simple test to middlewares",
    parameters: [
      {
        in: "header",
        name: "user-type",
        schema: {
          type: "string",
        },
        required: true,
      },
    ],
  })
  @Get("/auth-middleware-test")
  @UseBefore(Middlewares.Pre, Middlewares.Auth)
  AuthMiddleWareTester() {
    return {
      messge: "wheeee",
    };
  }
}
