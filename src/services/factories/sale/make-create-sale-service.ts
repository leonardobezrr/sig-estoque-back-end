import { PrismaItemRepository } from "../../../repositories/prisma/prisma-item-repository";
import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { PrismaSaleRepository } from "../../../repositories/prisma/prisma-sale-repository";
import { CreateSaleService } from "../../sale/create-sale";

export function makeCreateSaleService() {
    const prismaSaleRepository = new PrismaSaleRepository();
    const prismaItemRepository = new PrismaItemRepository();
    const prismaProductRepository = new PrismaProductRepository();

    const useCase = new CreateSaleService(prismaSaleRepository, prismaItemRepository, prismaProductRepository);

    return useCase;
}