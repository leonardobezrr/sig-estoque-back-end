import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaSaleRepository {
    async create(data: Prisma.SaleCreateInput) {
        const sale = await prisma.sale.create({
            data,
        });

        return sale;
    }

    async findById(id: string) {
        const sale = await prisma.sale.findUnique({
            where: {
                id,
            },
        });

        return sale;
    }

    async findMany() {
        const sales = await prisma.sale.findMany();

        return sales;
    }

    async update(data: Prisma.SaleCreateInput) {
        const sale = await prisma.sale.update({
            where: {
                id: data.id,
            },
            data,
        });

        return sale;
    }

    async delete(id: string) {
        const sale = await prisma.sale.delete({
            where: {
                id,
            },
        });

        return sale;
    }
}