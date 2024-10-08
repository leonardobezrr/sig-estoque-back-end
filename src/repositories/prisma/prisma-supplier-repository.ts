import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { SupplierRepository } from "../supplier-repository";

export class PrismaSupplierRepository implements SupplierRepository {
    async create(data: Prisma.SupplierCreateInput) {
        const supplier = await prisma.supplier.create({
            data
        });

        return supplier;
    }

    async findMany() {
        return prisma.supplier.findMany();
    }

    async delete(id: string) {
        return prisma.supplier.delete({
            where: { id },
        });
    }

    async findManyBySocialName(socialName: string) {
        return prisma.supplier.findMany({
            where: {
                social_name: {
                    contains: socialName,
                    mode: 'insensitive'
                }
            }
        });
    }

    async findManyByCompanyName(companyName: string) {
        return prisma.supplier.findMany({
            where: {
                company_name: {
                    contains: companyName,
                    mode: 'insensitive'
                }
            }
        });
    }

    async findById(id: string) {
        return prisma.supplier.findUnique({ where: { id } });
    }

    async patch(id: string, data: Prisma.SupplierUpdateInput) {
        return prisma.supplier.update({
            where: { id },
            data
        });
    }
}