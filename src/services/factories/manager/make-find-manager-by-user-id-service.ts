import { PrismaManagerRepository } from "../../../repositories/prisma/prisma-manager-repository";
import { FindManagerByUserId } from "../../manager/find-manager-by-user-id";

export function makeFindManagerByUserIdService() {
  const prismaManagersRepository = new PrismaManagerRepository();
  const findManagerByUserId = new FindManagerByUserId(prismaManagersRepository);

  return findManagerByUserId;
}