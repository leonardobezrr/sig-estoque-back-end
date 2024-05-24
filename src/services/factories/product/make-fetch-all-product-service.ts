import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { FetchAllProductService } from "../../product/fetch-all-product";

export function makeFetchAllProductService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new FetchAllProductService(prismaProductRepository);

    return useCase;
}