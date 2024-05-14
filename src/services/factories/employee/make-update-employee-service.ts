import { PrismaEmployeeRepository } from "../../../repositories/prisma/prisma-employee-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { UpdateEmployeeService } from "../../employee/update-employee";


export function makeUpdateEmployeeService() {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const prismaUserRepository = new PrismaUserRepository();

  const updateEmployeeService = new UpdateEmployeeService(
    prismaEmployeeRepository,
    prismaUserRepository
  );

  return updateEmployeeService;
}