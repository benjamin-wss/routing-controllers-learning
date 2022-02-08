import "reflect-metadata";

import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import * as Dto from "../dto";
import * as Services from "../services";
import * as Repositories from "../repositories";

@JsonController("/api/v1/users")
export default class Users {
  @OpenAPI({
    description: "Create user.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SystemUserMutable",
          },
        },
      },
    },
  })
  @Post("/prisma")
  async Create(@Body({ required: true }) payload: Dto.SystemUserMutable) {
    const userRepo = new Repositories.PrismaUserDbRepository();

    const service = new Services.User.UserService({
      userRepository: userRepo,
    });

    return service.Create(payload);
  }
}
