import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ProductRepository } from "../product-repository";

export class PrismaProductRepository implements ProductRepository {
    async create(data: Prisma.ProductCreateInput) {
        const product = await prisma.product.create({
            data
        });

        return product;
    }

    async findMany() {
        return prisma.product.findMany();
    }

    async findManyByName(name: string) {
        return prisma.product.findMany({
            where: {
                name
            }
        });
    }

    async findById(id: string) {
        return prisma.product.findUnique({ where: { id } });
    }

    async patch(id: string, data: Prisma.ProductUpdateInput) {
        return prisma.product.update({
            where: { id },
            data
        });
    }

    async inactivate(id: string) {
        return prisma.product.update({
            where: { id },
            data: {
                is_active: false
            }
        });
    }
}