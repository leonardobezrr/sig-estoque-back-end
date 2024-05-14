import { Employee } from "@prisma/client"
import { EmployeeRepository } from "../../repositories/employee-repository"

interface FindEmployeeByUserIdRequest {
  userId: string
}

interface FindEmployeeByUserIdResponse {
  employee: Employee | null
}

export class FindEmployeeByUserId {
  constructor(
    private employeeRepository: EmployeeRepository,
  ) { }

  async execute({
    userId
  }: FindEmployeeByUserIdRequest): Promise<FindEmployeeByUserIdResponse> {

    const employee = await this.employeeRepository.findByUserId(userId)

    return {
      employee
    }
  }
}