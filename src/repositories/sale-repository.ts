import { Sale, Prisma } from "@prisma/client";

export interface SaleRepository {
    create(data: Prisma.SaleCreateInput): Promise<Sale>;
    findById(id: string): Promise<Sale | null>;
    findMany(): Promise<Sale[]>;
    updateSubTotal(id: string, data: number): Promise<Sale>;
}