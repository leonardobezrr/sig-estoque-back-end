import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileService } from "../../../services/factories/user/make-get-user-profile-service";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";
import { makeFindManagerByUserIdService } from "../../../services/factories/manager/make-find-manager-by-user-id-service";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfileService();

  try {
    const { user } = await getUserProfile.execute({
      userId: request.user.sub
    });

    const userId = user.id;

    const switchUser = async () => {
      switch (user.role) {
        case "MANAGER":
          const findManagerByUserId = makeFindManagerByUserIdService();
          const manager = await findManagerByUserId.execute({ userId });
          return manager;
        // case "EMPLOYEE":
        //   const findEmployeeByUserIdService = makeFindEmployeeByUserIdService();
        //   const employee = await findEmployeeByUserIdService.execute({ userId });
        //   return employee;
        default:
          throw new ResourceNotFoundError();
      }
    };

    const switchedUser = await switchUser();

    return reply.status(200).send({
      user,
      switchedUser
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
