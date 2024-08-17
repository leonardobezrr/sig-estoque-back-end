import { PrismaItemRepository } from "../../../repositories/prisma/prisma-item-repository";
import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { PrismaPurchaseRepository } from "../../../repositories/prisma/prisma-purchase-repository";
import { CreatePurchaseService } from "../../purchase/create-purchase";

export function makeCreatePurchaseService() {
    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const prismaItemRepository = new PrismaItemRepository();
    const prismaProductRepository = new PrismaProductRepository();

    const useCase = new CreatePurchaseService(prismaPurchaseRepository, prismaItemRepository, prismaProductRepository);

    return useCase;
}