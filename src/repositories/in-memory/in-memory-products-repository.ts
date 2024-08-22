import { ProductRepository } from "../product-repository";
import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { InactiveError } from "../../services/errors/inactive-error";
import { ResourceNotFoundError } from "../../services/errors/resource-not-found-error";

export class InMemoryProductsRepository implements ProductRepository {
    private items: Array<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        quantity_in_stock: number | null;
        batch: string | null;
        supplierId: string;
        is_active: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }> = [];

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        const now = new Date();
    
        const product = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            quantity_in_stock: data.quantity_in_stock ?? null,
            batch: data.batch ?? null,
            supplierId: data.supplierId,  // Certifique-se de que este campo esteja presente
            is_active: data.is_active ?? true, // Usa o valor fornecido ou padrão para ativo
            createdAt: now,
            updatedAt: now,
        };
    
        this.items.push(product);
    
        return product;
    }
    

    async findMany(): Promise<Product[]> {
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

    findManyByIds(ids: string[]): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    async reduceStock(productId: string, quantity: number): Promise<void> {
        const product = await this.findById(productId);

        if (!product) {
            throw new ResourceNotFoundError();
        }

        if (product.quantity_in_stock === null || product.quantity_in_stock < quantity) {
            throw new Error("Insufficient stock");
        }

        product.quantity_in_stock -= quantity;
        product.updatedAt = new Date();
    }

    increaseStock(productId: string, quantity: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async patch(id: string, data: Prisma.ProductUpdateInput): Promise<Product | null> {
        const product = await this.findById(id);
    
        if (!product) {
            return null;
        }
    
        if (!product.is_active) {
            throw new InactiveError();
        }
    
        // Construir o produto atualizado
        const updatedProduct = {
            ...product,
            ...data,  // Supondo que `data` tenha um formato compatível com `Product`
            updatedAt: new Date(),
        };

        // Garantir que updatedProduct corresponde ao tipo esperado
        const updatedProductCorrectType: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            quantity_in_stock: number | null;
            batch: string | null;
            supplierId: string;
            is_active: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        } = updatedProduct as any;

        this.items = this.items.map((item) =>
            item.id === id ? updatedProductCorrectType : item
        );
    
        return updatedProductCorrectType;
    }
}
