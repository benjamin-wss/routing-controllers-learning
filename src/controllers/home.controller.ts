import { Get, HttpCode, JsonController, Res } from "routing-controllers";
import { Response } from "express";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import "reflect-metadata";
import { IsString } from "class-validator";

interface IHeartBeatResponse {
  message: string;
}

class HeartBeatResponse {
  @IsString()
  public message: string;
}

@JsonController("/")
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
  @Get("")
  @HttpCode(200)
  Index(@Res() response: Response): Response<IHeartBeatResponse> {
    // const payload: IHeartBeatResponse = {
    //   message: "Ah La Vache, ze server is running !!",
    // };
    const payload = new HeartBeatResponse();
    payload.message = "Ah La Vache, ze server is running !!";

    return response.json(payload);
  }

  @Get("/error-testing")
  ErrorTester() {
    const error = new Error("Some Shit");
    throw error;
  }
}
