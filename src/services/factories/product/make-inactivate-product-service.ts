import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { InactivateProductService } from "../../product/inactivate-product";

export function makeInactivateProductService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new InactivateProductService(prismaProductRepository);

    return useCase;
}