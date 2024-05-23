import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface FindProductByIdServiceRequest {
    productId: string;
}

interface FindProductByIdServiceResponse {
    product: Product;
}

export class FindProductByIdService {
    constructor(private productRepository: ProductRepository) {

    }

    async execute({ productId }: FindProductByIdServiceRequest): Promise<FindProductByIdServiceResponse> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            //TODO: Create a custom error class
            throw new Error('Product not found');
        }

        if (!product.is_active) {
            throw new Error('Product does not exist or is inactive');
        }

        return {
            product
        }
    }
}