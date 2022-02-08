import * as Interfaces from "./interfaces";
import { IsString, IsDate } from "class-validator";

export class PostMutable implements Interfaces.IPostMutable {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  authorId: string;

  constructor(input: Interfaces.IPostMutable) {
    if (!input) {
      return;
    }

    Object.keys(input).forEach((key: string) => {
      this[key] = input[key];
    });
  }
}

export class Post implements Interfaces.IPost {
  @IsString()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  authorId: string;

  author: Interfaces.ISystemUser | null;

  constructor(input: Interfaces.IPost) {
    Object.keys(input).forEach((key: string) => {
      this[key] = input[key];
    });
  }
}
