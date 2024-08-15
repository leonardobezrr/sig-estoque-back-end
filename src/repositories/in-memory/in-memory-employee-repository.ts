import { Employee } from "@prisma/client";
import { EmployeeRepository } from "../employee-repository";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryEmployeesRepository implements EmployeeRepository {
  private items: Employee[] = [];

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    const now = new Date();

    if (!data.user.connect?.id) {
      throw new Error("User ID is required");
    }

    const employee = {
      id: randomUUID(),
      userId: data.user.connect.id,
      createdAt: now,
      updatedAt: now,
    };

    this.items.push(employee);

    return employee;
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.id === id);
    return employee || null;
  }

  async findMany(): Promise<Employee[]> {
    return this.items;
  }

  async findByUserId(userId: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.userId === userId);
    return employee || null;
  }

  async update(employee: Employee): Promise<Employee> {
    const employeeIndex = this.items.findIndex((item) => item.id === employee.id);

    if (employeeIndex === -1) {
      throw new Error("Employee not found");
    }

    const updatedEmployee = {
      ...this.items[employeeIndex],
      ...employee,
      updatedAt: new Date(),
    };

    this.items[employeeIndex] = updatedEmployee;
    
    return updatedEmployee;
  }
}