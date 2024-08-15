import { Sale, Prisma } from "@prisma/client";

export interface SaleRepository {
    create(data: Prisma.SaleCreateInput): Promise<Sale>;
    findById(id: string): Promise<Sale | null>;
    findMany(): Promise<Sale[]>;
    update(user: Prisma.SaleCreateInput): Promise<Sale>;
    delete(id: string): Promise<Sale>;
}