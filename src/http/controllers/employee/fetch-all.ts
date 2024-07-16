import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllEmployeesService } from "../../../services/factories/employee/make-fetch-all-employees-service";

export async function fetchAllEmployees(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchAllEmployeeService = makeFetchAllEmployeesService();

    const { employee } = await fetchAllEmployeeService.execute();

    return reply.status(200).send({ employee: employee });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}