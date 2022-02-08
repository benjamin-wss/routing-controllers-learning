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
    const newPost = this.PostRepository.create(input, true);

    return newPost;
  }
}
