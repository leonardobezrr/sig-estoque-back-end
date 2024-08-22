import { ProductRepository } from "../../repositories/product-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ReduceProductStockServiceRequest {
    productId: string;
    quantity: number;
}

export class ReduceProductStockService {
    constructor(private productRepository: ProductRepository) { }

    async execute({ productId, quantity }: ReduceProductStockServiceRequest): Promise<void> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new ResourceNotFoundError();
        }

        if (product.quantity_in_stock === null) {
            throw new Error('Product stock information is missing');
        }

        if (product.quantity_in_stock < quantity) {
            throw new Error('Insufficient stock');
        }

        await this.productRepository.reduceStock(productId, quantity);
    }
}
