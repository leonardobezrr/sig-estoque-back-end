import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaSaleRepository {
    async create(data: Prisma.SaleCreateInput) {
        const sale = await prisma.sale.create({
            data,
        });

        return sale;
    }
}