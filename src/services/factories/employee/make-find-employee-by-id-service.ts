import { PrismaEmployeeRepository } from "../../../repositories/prisma/prisma-employee-repository";
import { FindEmployeeByIdService } from "../../employee/find-employee-by-id";

export function makeFindEmployeeByIdService() {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const findEmployeeByIdService = new FindEmployeeByIdService(prismaEmployeeRepository);

  return findEmployeeByIdService;
}