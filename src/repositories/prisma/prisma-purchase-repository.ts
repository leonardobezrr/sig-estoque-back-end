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

    async findMany() {
        const purchases = await prisma.purchase.findMany();

        return purchases;
    }

    async findManyByUserId(userId: string) {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId,
            },
        });

        return purchases;
    }

    async findManyBySupplierId(supplierId: string) {
        const purchases = await prisma.purchase.findMany({
            where: {
                supplierId,
            },
        });

        return purchases;
    }

    async findById(id: string) {
        const purchase = await prisma.purchase.findUnique({
            where: {
                id,
            },
        });

        return purchase;
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