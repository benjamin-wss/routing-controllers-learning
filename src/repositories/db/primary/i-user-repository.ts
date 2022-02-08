import { ISystemUserMutable, SystemUser } from "../../../dto";

export interface IUserRepository {
  create(input: ISystemUserMutable): Promise<SystemUser>;
  findAll(pageIndex: Number, pageSize: Number): Promise<SystemUser[]>;
}
