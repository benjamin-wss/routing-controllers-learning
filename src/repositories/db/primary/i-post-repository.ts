import * as Dto from "../../../dto";

export interface IPostRepository {
  Create(
    post: Dto.IPostMutable,
    includeAuthorData: boolean
  ): Promise<Dto.IPost>;
  GetCountByAuthorId(authorId: string): Promise<number>;
  GetByAuthorId(
    pageIndex: Number,
    pageSize: Number,
    authorId: string,
    includeAuthorMetadata: boolean
  ): Promise<Dto.IPost[]>;
}
