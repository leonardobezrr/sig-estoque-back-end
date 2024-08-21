import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InactiveError } from "../errors/inactive-error";

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
            throw new ResourceNotFoundError();
        }

        if (!product.is_active) {
            throw new InactiveError();
        }

        return {
            product
        }
    }
}