import BaseClass from "./_prisma-db-base.repository";
import {
  IPostMutable,
  IPost,
  PostDto as PostDto,
  ISystemUser,
} from "../../../dto";
import { IPostRepository } from "./i-post-repository";

export class PrismaPostDbRepository
  extends BaseClass
  implements IPostRepository
{
  async Create(
    post: IPostMutable,
    includeAuthorData: boolean = false
  ): Promise<IPost> {
    const client = super.PrismaClient;

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

    const result = new PostDto({
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
    const result = await super.PrismaClient.post.count({
      where: {
        authorId: BigInt(authorId),
      },
    });

    return result;
  }

  async GetByAuthorId(
    pageIndex: number,
    pageSize: number,
    authorId: string,
    includeAuthorMetadata: boolean = false,
    includeCredentials: boolean = false
  ): Promise<IPost[]> {
    if (!includeAuthorMetadata) {
      const result = await super.PrismaClient.post.findMany({
        orderBy: {
          createdAt: "asc",
        },
        skip: pageSize * pageIndex,
        take: pageSize,
        where: {
          authorId: BigInt(authorId),
        },
      });

      if (!Array.isArray(result)) {
        return [];
      }

      return result.map((x) => {
        const row: IPost = {
          author: null,
          authorId: String(x.authorId),
          content: x.content,
          createdAt: x.createdAt,
          id: String(x.id),
          title: x.title,
        };

        return row;
      });
    }

    const result = await super.PrismaClient.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
      skip: pageSize * pageIndex,
      take: pageSize,
      where: {
        authorId: BigInt(authorId),
      },
      include: {
        author: true,
      },
    });

    return result.map((x) => {
      const row: IPost = {
        author: {
          createdAt: x.author.createdAt,
          email: x.author.email,
          emailConfirmed: x.author.emailConfirmed,
          id: String(x.author.id),
          isAdmin: x.author.isAdmin,
          password: x.author.password,
          username: x.author.username,
        },
        authorId: String(x.authorId),
        content: x.content,
        createdAt: x.createdAt,
        id: String(x.id),
        title: x.title,
      };

      if (!includeCredentials) {
        row.author.password = "********";
      }

      return row;
    });
  }
}
