import { ProductRepository } from "../../repositories/product-repository";

interface InactivateProductServiceRequest {
    productId: string;
}

export class InactivateProductService {
    constructor(private productRepository: ProductRepository) {
    }

    async execute({ productId }: InactivateProductServiceRequest): Promise<void> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        await this.productRepository.inactivate(productId);
    }
}
