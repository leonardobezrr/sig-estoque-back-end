import { User, Prisma } from "@prisma/client";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(user: Prisma.UserCreateInput): Promise<User>;
  findMany(): Promise<User[]>
  delete(id: string): Promise<User>;
}