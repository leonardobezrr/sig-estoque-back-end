import { CreateProductService } from "../../product/create-product";
import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";

export function makeCreateProductService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new CreateProductService(prismaProductRepository);

    return useCase;
}