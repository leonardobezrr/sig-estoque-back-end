import { PrismaManagerRepository } from "../../../repositories/prisma/prisma-manager-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { CreateManagerService } from "../../manager/create-manager";

export function makeCreateManagerService() {
    const prismaManagerRepository = new PrismaManagerRepository();
    const prismaUserRepository = new PrismaUserRepository();
    const createManagerService = new CreateManagerService(
        prismaManagerRepository,
        prismaUserRepository
    );

    return createManagerService;
}