import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaItemRepository {
    async create(data: Prisma.ItemCreateInput) {
        const item = await prisma.item.create({
            data,
        });

        return item;
    }

    async delete(id: string) {
        const item = await prisma.item.delete({
            where: {
                id
            }
        });

        return item;
    }
}