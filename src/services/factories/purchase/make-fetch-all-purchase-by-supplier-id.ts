import { PrismaPurchaseRepository } from "../../../repositories/prisma/prisma-purchase-repository";
import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { FetchAllPurchaseBySupplierIdService } from "../../purchase/fetch-all-purchase-by-supplier-id";

export function makeFetchAllPurchaseBySupplierIdService() {
    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const prismaSupplierRepository = new PrismaSupplierRepository();

    const useCase = new FetchAllPurchaseBySupplierIdService(prismaPurchaseRepository, prismaSupplierRepository);

    return useCase;
}