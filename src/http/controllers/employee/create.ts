import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";
import { makeCreateEmployeeService } from "../../../services/factories/employee/make-create-employee-service";

export async function createEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createEmployeeSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password } = createEmployeeSchema.parse(request.body);

  try {
    const createEmployeeService = makeCreateEmployeeService();

    await createEmployeeService.execute({
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