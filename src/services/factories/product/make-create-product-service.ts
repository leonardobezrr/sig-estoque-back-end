import { CreateProductService } from "../../product/create-product";
import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";

export function makeCreateProductService() {
    const productRepository = new PrismaProductRepository();
    const useCase = new CreateProductService(productRepository);

    return useCase;
}