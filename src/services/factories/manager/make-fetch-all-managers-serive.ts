import { PrismaManagerRepository } from "../../../repositories/prisma/prisma-manager-repository";
import { FetchAllManagerService } from "../../manager/fetch-all-manager";

export function makeFetchAllManagersService() {
  const prismaManagerRepository = new PrismaManagerRepository();
  const fetchAllManagerService = new FetchAllManagerService(prismaManagerRepository);

  return fetchAllManagerService;
}