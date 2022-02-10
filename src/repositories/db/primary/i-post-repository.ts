import * as Dto from "../../../dto";

export interface IPostRepository {
  Create(
    post: Dto.IPostMutable,
    includeAuthorData: boolean
  ): Promise<Dto.IPost>;
  GetCountByAuthorId(authorId: string): Promise<number>;
  GetByAuthorId(
    pageIndex: number,
    pageSize: number,
    authorId: string,
    includeAuthorMetadata: boolean,
    includeCredentials: boolean
  ): Promise<Dto.IPost[]>;
}
