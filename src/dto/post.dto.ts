import * as Interfaces from "./interfaces";

export class PostMutable implements Interfaces.IPostMutable {
  title: string;
  content: string;
  authorId: string;

  constructor(input: Interfaces.IPostMutable) {
    Object.keys(input).forEach((key: string) => {
      this[key] = input[key];
    });
  }
}

export class Post implements Interfaces.IPost {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  authorId: string;
  author: Interfaces.ISystemUser | null;

  constructor(input: Interfaces.IPost) {
    Object.keys(input).forEach((key: string) => {
      this[key] = input[key];
    });
  }
}
