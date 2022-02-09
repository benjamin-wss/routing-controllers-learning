import "reflect-metadata";

import { Body, Get, JsonController, Param, Post } from "routing-controllers";
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
  @Post("")
  async Create(@Body({ required: true }) payload: Dto.SystemUserMutable) {
    const userRepo = new Repositories.PrismaUserDbRepository();

    const service = new Services.User.UserService({
      userRepository: userRepo,
    });

    return service.Create(payload);
  }

  @Get("/:id/posts/count")
  async GetCountOfPosts(@Param("id") id: string) {
    const postRepo = new Repositories.PrismaPostDbRepository();

    const service = new Services.Post.PostService(postRepo);
    const count = await service.GetCountOfPostsByAhutorId(id);

    return {
      count,
    };
  }
}
