import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      password_hash: data.password_hash,
    };

    this.items.push(user);

    return user;
  }

  async delete(id: string): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const [deletedUser] = this.items.splice(userIndex, 1);
    return deletedUser;
  }

  async findMany(): Promise<User[]> {
    return this.items;
  }

  async update(data: Prisma.UserCreateInput): Promise<User> {
    if (!data.id) {
        throw new Error("User ID is required for updating.");
    }

    const userIndex = this.items.findIndex((item) => item.id === data.id);

    if (userIndex === -1) {
        throw new Error("User not found.");
    }

    const updatedUser = {
        ...this.items[userIndex],
        name: data.name,
        email: data.email,
        role: data.role,
        password_hash: data.password_hash,
    };

    this.items[userIndex] = updatedUser;

    return updatedUser;
}

}
