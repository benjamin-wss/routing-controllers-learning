import BaseClass from "./_prisma-db-base.repository";
import { ISystemUserMutable, SystemUser } from "../../../dto";
import { IUserRepository } from "./i-user-repository";

export class PrismaUserDbRepository
  extends BaseClass
  implements IUserRepository
{
  async create(input: ISystemUserMutable): Promise<SystemUser> {
    const client = super.PrismaClient;
    const newUser = await client.user.create({
      data: {
        ...input,
      },
    });

    return new SystemUser(
      String(newUser.id),
      newUser.createdAt,
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.isAdmin,
      newUser.emailConfirmed
    );
  }
  findAll(pageIndex: Number, pageSize: Number): Promise<SystemUser[]> {
    throw new Error("Method not implemented.");
  }
}
