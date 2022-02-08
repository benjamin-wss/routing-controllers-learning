import { PrismaClient } from "@prisma/client";

import { IPostMutable, IPost, Post } from "../../../dto";
import { IPostRepository } from "./i-post-repository";

export class PostDbRepository implements IPostRepository {
  async create(post: IPostMutable): Promise<IPost> {
    const client = new PrismaClient();
    const newPost = await client.post.create({
      data: {
        content: post.content,
        title: post.title,
        authorId: post.authorId as any,
      },
    });

    const result = new Post({
      authorId: String(newPost.authorId),
      content: newPost.content,
      title: newPost.title,
      author: null,
      createdAt: newPost.createdAt,
      id: newPost.id,
    });

    return result;
  }
  getByAUthorId(
    pageIndex: Number,
    pageSize: Number,
    authorId: string,
    includeeAuthorMetadata: boolean = false
  ): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }
}
