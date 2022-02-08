import { PrismaClient } from "@prisma/client";
import { SystemUser } from "dto";

import { ISystemUserMutable } from '../../../dto'
import { IUser } from "./IUser";

export class PrismaUserDbRepository implements IUser {
  async create(input: ISystemUserMutable): Promise<SystemUser> {
    const client = new PrismaClient();
    const newUser = await client.user.create({
      data: {
        ...input,
      },
    });

    return newUser;
  }
  findAll(pageIndex: Number, pageSize: Number): Promise<SystemUser[]> {
    throw new Error("Method not implemented.");
  }
};
