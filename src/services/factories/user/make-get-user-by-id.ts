import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { GetUserByIdService } from "../../user/get-user-by-id";

export function makeGetUserByIdService() {
  const prismaUserRepository = new PrismaUserRepository;
  const getUserByIdService = new GetUserByIdService(prismaUserRepository);

  return getUserByIdService;
}