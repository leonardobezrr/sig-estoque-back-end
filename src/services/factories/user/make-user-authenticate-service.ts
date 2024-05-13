import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository"
import { UserAuthenticateService } from "../../user/user-authenticate"

export function makeUserAuthenticateService() {
  const prismaUserRepository = new PrismaUserRepository
  const authenticateUserService = new UserAuthenticateService(prismaUserRepository)

  return authenticateUserService
}