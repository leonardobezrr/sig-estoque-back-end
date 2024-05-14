import { PrismaEmployeeRepository } from "../../../repositories/prisma/prisma-employee-repository";
import { FindEmployeeByUserId } from "../../employee/find-employee-by-user-id";

export function makeFindEmployeeByUserIdService() {
  const prismaEmployeesRepository = new PrismaEmployeeRepository();
  const findEmployeeByUserId = new FindEmployeeByUserId(prismaEmployeesRepository);

  return findEmployeeByUserId;
}