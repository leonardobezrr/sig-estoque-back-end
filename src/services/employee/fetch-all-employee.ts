import { Employee } from "@prisma/client";
import { EmployeeRepository } from "../../repositories/employee-repository";

interface FetchAllEmployeeServiceResponse {
  employee: Employee[];
}

export class FetchAllEmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(): Promise<FetchAllEmployeeServiceResponse> {
    const employee = await this.employeeRepository.findMany();

    return {
      employee
    };
  }
}