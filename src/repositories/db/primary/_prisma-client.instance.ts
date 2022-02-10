import { PrismaClient } from "@prisma/client";

class InternalPrismaInstance {
  private static _instance: InternalPrismaInstance;
  private _prismaClient: PrismaClient;

  private constructor() {
    this._prismaClient = new PrismaClient();
  }

  get InternalPrismaClient() {
    return this._prismaClient;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default InternalPrismaInstance.Instance;
