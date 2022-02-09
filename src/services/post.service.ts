import "reflect-metadata";

import { IPostRepository } from "../repositories";
import { IPostMutable, IPost } from "../dto";

export class PostService {
  private readonly _postRepository: IPostRepository;

  get PostRepository(): IPostRepository {
    return this._postRepository;
  }

  constructor(postRepository: IPostRepository) {
    this._postRepository = postRepository;
  }

  async Create(input: IPostMutable): Promise<IPost> {
    const newPost = this.PostRepository.Create(input, true);

    return newPost;
  }

  async GetCountOfPostsByAhutorId(authorId: string): Promise<number> {
    const count = await this.PostRepository.GetCountByAuthorId(authorId);

    return count;
  }
}
