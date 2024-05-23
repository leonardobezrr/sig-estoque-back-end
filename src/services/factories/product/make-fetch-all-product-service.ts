import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { FetchAllProductDataService } from "../../product/fetch-all-product";

export function makeFetchAllProductService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new FetchAllProductDataService(prismaProductRepository);

    return useCase;
}