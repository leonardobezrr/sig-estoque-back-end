import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface FetchAllProductDataServiceResponse {
    product: Product[];
}

export class FetchAllProductDataService {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchAllProductDataServiceResponse> {
        const product = await this.productRepository.findMany();

        return {
            product
        };
    }
}