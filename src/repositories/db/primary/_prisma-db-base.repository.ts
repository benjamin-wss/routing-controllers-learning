import { PrismaClient } from "@prisma/client";
import InternalPrismaInstance from "./_prisma-client.instance";

export default class PrismaDbBaseRepository {
  get PrismaClient(): PrismaClient {
    return InternalPrismaInstance.InternalPrismaClient;
  }
}
