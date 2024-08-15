import { Manager, Prisma } from "@prisma/client";
import { ManagerRepository } from "../manager-repository";
import { randomUUID } from "crypto";

export class InMemoryManagersRepository implements ManagerRepository {
  private items: Array<{
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  async create(data: Prisma.ManagerCreateInput): Promise<Manager> {
    const now = new Date();

    if (!data.user.connect?.id) {
      throw new Error("User ID is required");
    }

    const manager = {
      id: randomUUID(),
      userId: data.user.connect.id,
      createdAt: now,
      updatedAt: now,
    };

    this.items.push(manager);

    return manager;
  }

  async findMany(): Promise<Manager[]> {
    return this.items;
  }

  async findById(id: string): Promise<Manager | null> {
    const manager = this.items.find(item => item.id === id);
    return manager ? manager : null;
  }

  async findByUserId(userId: string): Promise<Manager | null> {
    const manager = this.items.find(item => item.userId === userId);
    return manager ? manager : null;
  }

  async update(manager: Manager): Promise<Manager> {
    const index = this.items.findIndex(item => item.id === manager.id);
  
    if (index === -1) {
      throw new Error("Manager not found.");
    }
  
    this.items[index] = {
      ...this.items[index],
      ...manager,
      updatedAt: new Date(),
    };
  
    return this.items[index];
  }
}
