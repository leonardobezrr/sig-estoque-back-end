import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface PatchProductServiceRequest {
    id: string;
    data: {
        name?: string;
        description?: string;
        price?: number;
        quantity_in_stock?: number;
        batch?: string;
    };
}

interface PatchProductServiceResponse {
    product: Product | null;
}

export class PatchProductService {
    constructor(private productRepository: ProductRepository) { }

    async handle({ id, data }: PatchProductServiceRequest): Promise<PatchProductServiceResponse> {
        const productExists = await this.productRepository.findById(id);

        if (!productExists) {
            throw new Error('Product not found');
        }

        if (!productExists.is_active) {
            throw new Error('Product does not exist or is inactive');
        }

        const product = await this.productRepository.patch(id, data);

        return {
            product
        };
    }
}