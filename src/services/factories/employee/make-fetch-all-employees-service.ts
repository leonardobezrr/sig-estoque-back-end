import { PrismaEmployeeRepository } from "../../../repositories/prisma/prisma-employee-repository";
import { FetchAllEmployeeService } from "../../employee/fetch-all-employee";

export function makeFetchAllEmployeesService() {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const fetchAllEmployeeService = new FetchAllEmployeeService(prismaEmployeeRepository);

  return fetchAllEmployeeService;
}