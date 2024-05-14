import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateEmployeeService } from "../../../services/factories/employee/make-update-employee-service";

export async function updateEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateEmployeeBodySchema = z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).optional(),
  });

  try {
    const { userId, name, email, password } = updateEmployeeBodySchema.parse(
      request.body
    );

    const updateEmployeeService = makeUpdateEmployeeService();

    await updateEmployeeService.execute({
      userId,
      name,
      email,
      password,
    });

    return reply.status(200).send({ message: "Employee successfully updated." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}