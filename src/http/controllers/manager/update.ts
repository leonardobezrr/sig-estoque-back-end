import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateManagerService } from "../../../services/factories/manager/make-update-manager-service";

export async function updateManager(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateManagerBodySchema = z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).optional(),
  });

  try {
    const { userId, name, email, password } = updateManagerBodySchema.parse(
      request.body
    );

    const updateManagerService = makeUpdateManagerService();

    await updateManagerService.execute({
      userId,
      name,
      email,
      password,
    });

    return reply.status(200).send({ message: "Manager successfully updated." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}