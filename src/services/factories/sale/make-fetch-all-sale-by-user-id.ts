import { PrismaSaleRepository } from "../../../repositories/prisma/prisma-sale-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { FetchAllSaleByUserIdService } from "../../sale/fetch-all-sale-by-user-id";

export function makeFetchAllSaleByUserIdService() {
    const prismaSaleRepository = new PrismaSaleRepository();
    const prismaUserRepository = new PrismaUserRepository();

    const useCase = new FetchAllSaleByUserIdService(prismaSaleRepository, prismaUserRepository);

    return useCase;
}