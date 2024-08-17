import { PrismaPurchaseRepository } from "../../../repositories/prisma/prisma-purchase-repository";
import { FetchAllPurchaseService } from "../../purchase/fetch-all-purchase";

export function makeFetchAllPurchaseService() {
    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const useCase = new FetchAllPurchaseService(prismaPurchaseRepository);

    return useCase;
}