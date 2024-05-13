import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateManagerService } from "../../../services/factories/manager/make-create-manager-service";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";

export async function createManager(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createManagerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password } = createManagerSchema.parse(request.body);

  try {
    const createManagerService = makeCreateManagerService();

    await createManagerService.execute({
      name,
      email,
      password
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}