import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { GetAllUsersService } from "../../user/get-all-users";

export function makeGetAllUsersService() {
  const prismaUserRepository = new PrismaUserRepository();
  const getAllUsersService = new GetAllUsersService(prismaUserRepository);

  return getAllUsersService;
}