import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error";
import { makeFindEmployeeByIdService } from "../../../services/factories/employee/make-find-employee-by-id-service";

export async function findEmployeeById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findEmployeeByIdSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = findEmployeeByIdSchema.parse(request.params);

    const fetchEmployeeByIdService = makeFindEmployeeByIdService();

    const { employee } = await fetchEmployeeByIdService.execute({ id });

    return reply.status(200).send({ employee });
  } catch (error) {
    if (error instanceof NoRecordsFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}