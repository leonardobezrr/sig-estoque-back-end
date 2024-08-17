import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PurchaseRepository } from "../purchase-repository";

export class PrismaPurchaseRepository implements PurchaseRepository {
    async create(data: Prisma.PurchaseCreateInput) {
        const purchase = await prisma.purchase.create({
            data,
        });

        return purchase;
    }

    async findById(id: string) {
        const purchase = await prisma.purchase.findUnique({
            where: {
                id,
            },
        });

        return purchase;
    }

    async findMany() {
        const purchases = await prisma.purchase.findMany();

        return purchases;
    }

    async updateSubTotal(id: string, data: number) {
        const purchase = await prisma.purchase.update({
            where: {
                id,
            },
            data: {
                subTotal: data,
            },
        });

        return purchase;
    }
}