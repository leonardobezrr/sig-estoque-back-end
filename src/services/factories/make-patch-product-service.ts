import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository";
import { PatchProductService } from "../patch-product";

export function makePatchProductService() {
    const productRepository = new PrismaProductRepository();
    const useCase = new PatchProductService(productRepository);

    return useCase;
}