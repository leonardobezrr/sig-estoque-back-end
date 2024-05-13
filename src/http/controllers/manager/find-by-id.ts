import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindManagerByIdService } from "../../../services/factories/manager/make-find-manager-by-id-service";
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error";

export async function findManagerById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findManagerByIdSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = findManagerByIdSchema.parse(request.params);

    const fetchAdminByIdService = makeFindManagerByIdService();

    const { manager } = await fetchAdminByIdService.execute({ id });

    return reply.status(200).send({ manager });
  } catch (error) {
    if (error instanceof NoRecordsFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}