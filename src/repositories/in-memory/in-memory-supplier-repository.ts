import { SupplierRepository } from "../supplier-repository";
import { Prisma, Supplier } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemorySuppliersRepository implements SupplierRepository {
    private items: Array<{
        id: string;
        social_name: string;
        company_name: string;
        phone_number: string;
        cnpj: string;
        is_active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }> = [];

    async create(data: Prisma.SupplierCreateInput) {
        const now = new Date();

        const supplier = {
            id: randomUUID(),
            social_name: data.social_name,
            company_name: data.company_name,
            phone_number: data.phone_number,
            cnpj: data.cnpj,
            is_active: true,
            createdAt: now,
            updatedAt: now,
        };

        this.items.push(supplier);

        return supplier;
    }

    async findMany() {
        return this.items.filter(item => item.is_active);
    }

    async findManyByCompanyName(company_name: string) {
        return this.items.filter(item => item.company_name === company_name && item.is_active);
    }

    async findManyBySocialName(social_name: string) {
        return this.items.filter(item => item.social_name === social_name && item.is_active);
    }

    async findById(id: string) {
        const supplier = this.items.find(item => item.id === id);
        return supplier ? supplier : null;
    }

    async inactivate(id: string) {
        const supplier = await this.findById(id);

        if (!supplier) return null;

        supplier.is_active = false;
        supplier.updatedAt = new Date();

        return supplier;
    }

    async patch(id: string, data: Prisma.SupplierUpdateInput): Promise<Supplier | null> {
        const supplier = await this.findById(id);

        if (!supplier) {
            return null;
        }

        Object.assign(supplier, {
            ...data,
            updatedAt: new Date(),
        });

        return supplier;
    }
}
