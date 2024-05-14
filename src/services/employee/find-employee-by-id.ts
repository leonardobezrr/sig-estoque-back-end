import { Employee } from "@prisma/client";
import { EmployeeRepository } from "../../repositories/employee-repository";


interface FindEmployeeByIdServiceRequest {
  id: string;
}

interface FindEmployeeByIdServiceResponse {
  employee: Employee | null;
}

export class FindEmployeeByIdService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    id,
  }: FindEmployeeByIdServiceRequest): Promise<FindEmployeeByIdServiceResponse> {
    const employee = await this.employeeRepository.findById(id)

    return {
      employee
    };
  }
}