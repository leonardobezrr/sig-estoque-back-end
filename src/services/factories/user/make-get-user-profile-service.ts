import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { GetUserProfileService } from "../../user/get-user-profile";

export function makeGetUserProfileService() {
  const prismaUserRepository = new PrismaUserRepository;
  const getUserProfileService = new GetUserProfileService(prismaUserRepository);

  return getUserProfileService;
}