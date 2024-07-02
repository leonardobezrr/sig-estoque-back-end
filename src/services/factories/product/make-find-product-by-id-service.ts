import { PrismaProductRepository } from "../../../repositories/prisma/prisma-product-repository";
import { FindProductByIdService } from "../../product/find-product-by-id";

export function makeFindProductByIdService() {
    const prismaProductRepository = new PrismaProductRepository();
    const useCase = new FindProductByIdService(prismaProductRepository);

    return useCase;
}