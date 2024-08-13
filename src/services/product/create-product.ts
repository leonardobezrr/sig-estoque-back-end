import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface CreateProductServiceRequest {
    name: string;
    description: string;
    price: number;
    supplierId: string;
    quantity_in_stock: number,
    batch: string
}

interface CreateProductServiceResponse {
    product: Product
}

export class CreateProductService {
    constructor(private productRepository: ProductRepository) {
    }

    async handle({
        name, description, price, supplierId, quantity_in_stock, batch
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
        const product = await this.productRepository.create({
            supplierId,
            name,
            description,
            price,
            quantity_in_stock,
            batch
        });

        return {
            product
        }
    }
}