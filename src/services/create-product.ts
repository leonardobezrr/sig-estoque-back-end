import { Product } from "@prisma/client";
import { ProductRepository } from "../repositories/product-repository";

interface CreateProductServiceRequest {
    name: string;
    description: string;
    price: number;
}

interface CreateProductServiceResponse {
    product: Product
}

export class CreateProductService {
    constructor(private productRepository: ProductRepository) {
    }

    async handle({
        name, description, price
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
        const product = await this.productRepository.create({
            name,
            description,
            price
        });

        return {
            product
        }
    }
}