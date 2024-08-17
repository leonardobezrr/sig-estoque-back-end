import { PrismaSaleRepository } from "../../../repositories/prisma/prisma-sale-repository";
import { FetchAllSaleService } from "../../sale/fetch-all-sale";

export function makeFetchAllSaleService() {
    const prismaSaleRepository = new PrismaSaleRepository();
    const useCase = new FetchAllSaleService(prismaSaleRepository);

    return useCase;
}