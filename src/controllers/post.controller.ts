import "reflect-metadata";

import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import * as Dto from "../dto";
import * as Services from "../services";
import * as Repositories from "../repositories";

@JsonController("/api/v1/posts")
export default class Posts {
  @OpenAPI({
    description: "Create post.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostMutable",
          },
        },
      },
    },
  })
  @Post("/prisma")
  async Create(
    @Body({ required: true }) payload: Dto.PostMutable
  ): Promise<Dto.Post> {
    const postRepo = new Repositories.PrismaPostDbRepository();

    const service = new Services.Post.PostService(postRepo);

    return service.Create(payload);
  }
}
