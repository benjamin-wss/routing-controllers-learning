import BaseClass from "./_prisma-db-base.repository";
import { IPostMutable, IPost, Post, ISystemUser } from "../../../dto";
import { IPostRepository } from "./i-post-repository";

export class PrismaPostDbRepository
  extends BaseClass
  implements IPostRepository
{
  async Create(
    post: IPostMutable,
    includeAuthorData: boolean = false
  ): Promise<IPost> {
    const client = new super.PrismaClient();

    let newPost = null;

    if (includeAuthorData === false) {
      newPost = await client.post.create({
        data: {
          content: post.content,
          title: post.title,
          authorId: BigInt(post.authorId),
        },
      });
    } else {
      newPost = await client.post.create({
        data: {
          content: post.content,
          title: post.title,
          authorId: BigInt(post.authorId),
        },
        select: {
          title: true,
          id: true,
          createdAt: true,
          content: true,
          author: {
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true,
            },
          },
        },
      });
    }

    const result = new Post({
      authorId: String(newPost.authorId),
      content: newPost.content,
      title: newPost.title,
      author: includeAuthorData
        ? ({
            ...newPost.author,
            id: String(newPost.author.id),
          } as ISystemUser)
        : null,
      createdAt: newPost.createdAt,
      id: newPost.id,
    });

    return result;
  }

  async GetCountByAuthorId(authorId: string): Promise<number> {
    try {
      const result = await super.PrismaClient.post.count({
        where: {
          authorId: BigInt(authorId),
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  GetByAuthorId(
    pageIndex: Number,
    pageSize: Number,
    authorId: string,
    includeAuthorMetadata: boolean = false
  ): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }
}
