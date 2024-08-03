import { Prisma, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async delete(id: string) {
    await prisma.manager.deleteMany({
      where: { userId: id },
    });

    await prisma.employee.deleteMany({
      where: { userId: id },
    });

    const user = await prisma.user.delete({
      where: {
        id
      }
    })

    return user;
  }

  async findMany() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password_hash: true,
      }
    });

    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async update(data: User) {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}