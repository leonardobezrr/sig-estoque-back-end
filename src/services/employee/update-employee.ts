import { Employee } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcryptjs";
import { EmployeeRepository } from "../../repositories/employee-repository";

interface UpdateEmployeeServiceRequest {
  userId: string;
  name: string,
  email: string,
  password?: string,
}

interface UpdateEmployeeServiceResponse {
  employee: Employee
}

export class UpdateEmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: UpdateEmployeeServiceRequest): Promise<UpdateEmployeeServiceResponse> {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new Error("User not found.");
      }

      if (password) {
        const hashedPassword = await hash(password, 6);
        await this.userRepository.update({
          id: user.id,
          name,
          email,
          role: "EMPLOYEE",
          password_hash: hashedPassword,
        });
      }

      if (!password) {
        await this.userRepository.update({
          id: user.id,
          name,
          email,
          role: "EMPLOYEE",
          password_hash: user.password_hash,
        });
      }

      const oldEmployee = await this.employeeRepository.findByUserId(user.id);

      const updatedEmployee = await this.employeeRepository.update({
        userId: user.id,
        id: oldEmployee!.id
      });

      return {
        employee: updatedEmployee
      };
    } catch (error) {
      throw new Error("Error updating employee: " + error);
    }
  }
}