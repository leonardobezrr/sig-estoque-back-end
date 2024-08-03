import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { DeleteUserService } from "../../user/delete-user";

export function makeDeleteUserService() {
    const prismaUserRepository = new PrismaUserRepository();
    const deleteUserService = new DeleteUserService(prismaUserRepository);

    return deleteUserService;
}