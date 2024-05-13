import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllManagersService } from "../../../services/factories/manager/make-fetch-all-managers-serive";

export async function fetchAllManagers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchAllManagerService = makeFetchAllManagersService();

    const { managers } = await fetchAllManagerService.execute();

    return reply.status(200).send({ managers: managers });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}