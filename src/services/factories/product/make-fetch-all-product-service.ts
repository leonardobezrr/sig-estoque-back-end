import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { FetchAllProductsService } from "../../product/fetch-all-product";

export function makeFetchAllProductService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new FetchAllProductsService(prismaProductRepository);

    return useCase;
}