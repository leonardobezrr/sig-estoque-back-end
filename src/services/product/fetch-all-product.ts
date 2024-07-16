import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface FetchAllProductServiceResponse {
    product: Product[];
}

export class FetchAllProductService {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchAllProductServiceResponse> {
        const product = await this.productRepository.findMany();

        return {
            product
        };
    }
}