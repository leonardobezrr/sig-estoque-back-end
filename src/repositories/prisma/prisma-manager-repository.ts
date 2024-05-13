import { Manager, Prisma } from "@prisma/client";
import { ManagerRepository } from "../manager-repository";
import { prisma } from "../../lib/prisma";

export class PrismaManagerRepository implements ManagerRepository {
  async create(data: Prisma.ManagerCreateInput) {
    const manager = await prisma.manager.create({
      data,
    });

    return manager;
  }

  async findMany(): Promise<(Manager & { user: { email: string } })[]> {
    const managers = await prisma.manager.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return managers;
  }

  async findById(id: string) {
    const manager = await prisma.manager.findUnique({
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

    return manager;
  }

  async findByUserId(userId: string) {
    const manager = await prisma.manager.findFirst({
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

    return manager;
  }

  async update(data: Manager) {
    const manager = await prisma.manager.update({
      where: {
        id: data.id,
      },
      data,
    });

    return manager;
  }
  
}