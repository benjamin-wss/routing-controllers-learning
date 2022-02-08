import * as Dto from "../../../dto";

export interface IPostRepository {
  create(post: Dto.IPostMutable): Promise<Dto.IPost>;
  getByAUthorId(
    pageIndex: Number,
    pageSize: Number,
    authorId: string,
    includeeAuthorMetadata: boolean
  ): Promise<Dto.IPost[]>;
}
