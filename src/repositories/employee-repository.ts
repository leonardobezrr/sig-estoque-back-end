import { Employee, Prisma } from "@prisma/client";

export interface EmployeeRepository {
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>;
  findMany(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
  findByUserId(userId: string): Promise<Employee | null>;
  update(employee: Employee): Promise<Employee>;
}