import { Prisma, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
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