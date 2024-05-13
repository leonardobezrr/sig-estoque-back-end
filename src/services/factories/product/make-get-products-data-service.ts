import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { GetProductsDataService } from "../../product/get-products-data";

export function makeGetProductsDataService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new GetProductsDataService(prismaProductRepository);

    return useCase;
}