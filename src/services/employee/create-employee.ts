import { Employee } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserRepository } from "../../repositories/user-repository";
import { EmployeeRepository } from "../../repositories/employee-repository";

interface CreateEmployeeServiceRequest {
  name: string,
  email: string,
  password: string,
}

interface CreateEmployeeServiceResponse {
  employee: Employee
}

export class CreateEmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private userRepository: UserRepository
  ) { }

  async execute({
    name, email, password
  }: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("Email already exists.")
    }

    const userRole = "EMPLOYEE"

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      role: userRole
    });

    const employee = await this.employeeRepository.create({
      user: { connect: { id: user.id }}
    });

    return {
      employee
    }
  }
}