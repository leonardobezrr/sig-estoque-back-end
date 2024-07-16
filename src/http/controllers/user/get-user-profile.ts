import { FastifyReply, FastifyRequest } from "fastify"
import { makeGetUserProfileService } from "../../../services/factories/user/make-get-user-profile-service"
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error"
import { makeFindManagerByUserIdService } from "../../../services/factories/manager/make-find-manager-by-user-id-service"

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
      userId: request.user.sub
  })

  const userId = user.id

  const switchUser = async () => {
      switch (user.role) {
          case "MANAGER":
              const findAdminByUserId = makeFindManagerByUserIdService();
              const admin = await findAdminByUserId.execute({ userId });

              return admin;
          // case "EMPLOYEE":
          //     const findProfessionalByUserIdService = makeFindEmployeeByUserIdService();
          //     const employee = await findEmployeeByUserIdService.execute({ userId });

          //     return employee;

          default:
              return new ResourceNotFoundError()
      }
  }

  const switchedUser = await switchUser()

  return reply.status(200).send({
      user,
      switchedUser
  })
}