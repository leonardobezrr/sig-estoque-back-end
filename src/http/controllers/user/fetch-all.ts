import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllUsersService } from "../../../services/factories/user/make-get-all-users-service";

export async function fetchAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchAllUserService = makeGetAllUsersService();

    const { users } = await fetchAllUserService.execute();

    return reply.status(200).send({ users: users });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}