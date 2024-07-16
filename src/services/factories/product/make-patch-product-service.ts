import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { PatchProductService } from "../../product/patch-product";

export function makePatchProductService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new PatchProductService(prismaProductRepository);

    return useCase;
}