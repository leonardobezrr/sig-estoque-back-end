import { PrismaEmployeeRepository } from "../../../repositories/prisma/prisma-employee-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { CreateEmployeeService } from "../../employee/create-employee";

export function makeCreateEmployeeService() {
    const prismaEmployeeRepository = new PrismaEmployeeRepository();
    const prismaUserRepository = new PrismaUserRepository();
    const createEmployeeService = new CreateEmployeeService(
        prismaEmployeeRepository,
        prismaUserRepository
    );

    return createEmployeeService;
}