import { Product } from "@prisma/client";
import { ProductRepository } from "../repositories/product-repository";

interface GetProductsDataServiceResponse {
    product: Product[];
}

export class GetProductsDataService {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<GetProductsDataServiceResponse> {
        const product = await this.productRepository.findMany();

        return {
            product
        };
    }
}