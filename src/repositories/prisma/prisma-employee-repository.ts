import { Employee, Manager, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { EmployeeRepository } from "../employee-repository";

export class PrismaEmployeeRepository implements EmployeeRepository {
  async create(data: Prisma.EmployeeCreateInput) {
    const employee = await prisma.employee.create({
      data,
    });

    return employee;
  }

  async findMany(): Promise<(Employee & { user: { email: string } })[]> {
    const employees = await prisma.employee.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return employees;
  }

  async findById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return employee;
  }

  async findByUserId(userId: string) {
    const employee = await prisma.employee.findFirst({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return employee;
  }

  async update(data: Employee) {
    const employee = await prisma.employee.update({
      where: {
        id: data.id,
      },
      data,
    });

    return employee;
  }
  
}