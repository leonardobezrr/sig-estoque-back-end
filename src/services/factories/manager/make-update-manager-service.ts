import { PrismaManagerRepository } from "../../../repositories/prisma/prisma-manager-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UpdateManagerService } from "../../manager/update-manager";

export function makeUpdateManagerService() {
  const prismaManagerRepository = new PrismaManagerRepository();
  const prismaUserRepository = new PrismaUserRepository();

  const updateManagerService = new UpdateManagerService(
    prismaManagerRepository,
    prismaUserRepository
  );

  return updateManagerService;
}