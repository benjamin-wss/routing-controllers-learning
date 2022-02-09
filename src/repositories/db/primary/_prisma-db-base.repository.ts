import InternalPrismaInstance from "./_prisma-client.instance";

export default class PrismaDbBaseRepository {
  get PrismaClient() {
    return InternalPrismaInstance.InternalPrismaClient;
  }
}
