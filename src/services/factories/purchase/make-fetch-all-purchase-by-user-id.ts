import { PrismaPurchaseRepository } from "../../../repositories/prisma/prisma-purchase-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { FetchAllPurchaseByUserIdService } from "../../purchase/fetch-all-purchase-by-user-id";

export function makeFetchAllPurchaseByUserIdService() {
    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const prismaUserRepository = new PrismaUserRepository();

    const useCase = new FetchAllPurchaseByUserIdService(prismaPurchaseRepository, prismaUserRepository);

    return useCase;
}