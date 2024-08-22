import { PrismaSaleRepository } from "../../../repositories/prisma/prisma-sale-repository";
import { FindSaleByIdService } from "../../sale/find-sale-by-id";

export function makeFindSaleByIdService() {
    const prismaSaleRepository = new PrismaSaleRepository();
    const useCase = new FindSaleByIdService(prismaSaleRepository);

    return useCase;
}