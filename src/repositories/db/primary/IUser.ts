import { ISystemUserMutable, SystemUser } from "../../../dto/system-user.dto";

export interface IUser {
  create(input: ISystemUserMutable): Promise<SystemUser>;
  findAll(pageIndex: Number, pageSize: Number): Promise<SystemUser[]>;
}
