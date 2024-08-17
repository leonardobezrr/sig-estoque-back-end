import { PrismaPurchaseRepository } from "../../../repositories/prisma/prisma-purchase-repository";
import { FindPurchaseByIdService } from "../../purchase/find-purchase-by-id";

export function makeFindPurchaseByIdService() {
    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const useCase = new FindPurchaseByIdService(prismaPurchaseRepository);

    return useCase;
}