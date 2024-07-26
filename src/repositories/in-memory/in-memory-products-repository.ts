import { ProductRepository } from "../product-repository";
import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryProductsRepository implements ProductRepository {
    patch(id: string, data: Prisma.ProductUpdateInput): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }

    private items: Array<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        quantity_in_stock: number | null;
        batch: string | null;
        is_active: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }> = [];

    async create(data: Prisma.ProductCreateInput) {
        const now = new Date();

        const product = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            quantity_in_stock: data.quantity_in_stock ?? null,
            batch: data.batch ?? null,
            is_active: true, // Set is_active to true by default
            createdAt: now,
            updatedAt: now,
        };

        this.items.push(product);

        return product;
    }

    async findMany() {
        return this.items.filter(item => item.is_active);
    }

    async findManyByName(name: string) {
        return this.items.filter(item => item.name === name);
    }

    async findById(id: string) {
        const product = this.items.find(item => item.id === id);

        return product ? product : null;
    }

    async inactivate(id: string) {
        const product = await this.findById(id);

        if (!product) return null;

        product.is_active = false;
        product.updatedAt = new Date();

        return product;
    }
}
