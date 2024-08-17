import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { SaleRepository } from "../sale-repository";

export class PrismaSaleRepository implements SaleRepository {
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

    async updateSubTotal(id: string, data: number) {
        const sale = await prisma.sale.update({
            where: {
                id,
            },
            data: {
                subTotal: data,
            },
        });

        return sale;
    }
}