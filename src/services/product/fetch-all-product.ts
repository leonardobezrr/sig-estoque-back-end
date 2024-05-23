import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface FetchAllProductsServiceResponse {
    product: Product[];
}

export class FetchAllProductsService {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchAllProductsServiceResponse> {
        const product = await this.productRepository.findMany();

        return {
            product
        };
    }
}