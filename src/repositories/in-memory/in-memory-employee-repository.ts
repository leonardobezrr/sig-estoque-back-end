import { Prisma, Employee } from "@prisma/client";
import { EmployeeRepository } from "../employee-repository";
import { randomUUID } from "crypto";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  public items: Employee[] = [];

  async create(data: Prisma.EmployeeCreateInput) {
    const employee = {
      id: randomUUID(),
      userId: randomUUID(),
    };

    this.items.push(employee);

    return employee;
  }
  findMany(): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Employee | null> {
    throw new Error("Method not implemented.");
  }
  findByUserId(userId: string): Promise<Employee | null> {
    throw new Error("Method not implemented.");
  }
  update(employee: Employee): Promise<Employee> {
    throw new Error("Method not implemented.");
  }
}
