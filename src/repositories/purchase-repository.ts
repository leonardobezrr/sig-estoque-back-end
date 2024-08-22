import { Purchase, Prisma } from "@prisma/client";

export interface PurchaseRepository {
    create(data: Prisma.PurchaseCreateInput): Promise<Purchase>;
    findById(id: string): Promise<Purchase | null>;
    findManyByUserId(userId: string): Promise<Purchase[]>
    findManyBySupplierId(supplierId: string): Promise<Purchase[]>
    findMany(): Promise<Purchase[]>;
    updateSubTotal(id: string, data: number): Promise<Purchase>;
}