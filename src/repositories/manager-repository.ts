import { Manager, Prisma } from "@prisma/client";

export interface ManagerRepository {
  create(data: Prisma.ManagerCreateInput): Promise<Manager>;
  findMany(): Promise<Manager[]>;
  findById(id: string): Promise<Manager | null>;
  findByUserId(userId: string): Promise<Manager | null>;
  update(manager: Manager): Promise<Manager>;
}