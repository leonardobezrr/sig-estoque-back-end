import { Product } from "@prisma/client";
import { ProductRepository } from "../repositories/product-repository";

interface GetProductByIdServiceRequest {
    productId: string;
}

interface GetProductByIdServiceResponse {
    product: Product;
}

export class GetProductByIdService {
    constructor(private productRepository: ProductRepository) {

    }

    async execute({ productId }: GetProductByIdServiceRequest): Promise<GetProductByIdServiceResponse> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            //TODO: Create a custom error class
            throw new Error('Product not found');
        }

        return {
            product
        }
    }
}