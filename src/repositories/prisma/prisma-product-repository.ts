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
        return prisma.product.findMany(
            {
                where: {
                    is_active: true
                }
            }
        );
    }

    async findManyByName(name: string) {
        return prisma.product.findMany({
            where: {
                name
            }
        });
    }

    async findManyByIds(ids: string[]) {
        return prisma.product.findMany({
            where: {
                id: {
                    in: ids
                }
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

    async reduceStock(productId: string, quantity: number): Promise<void> {
        await prisma.product.update({
            where: { id: productId },
            data: {
                quantity_in_stock: {
                    decrement: quantity,
                },
            },
        });
    }

    async increaseStock(productId: string, quantity: number): Promise<void> {
        await prisma.product.update({
            where: { id: productId },
            data: {
                quantity_in_stock: {
                    increment: quantity,
                },
            },
        });
    }
}