import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { FindSupplierByIdService } from "../../supplier/find-supplier-by-id";

export function makeFindSupplierByIdService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new FindSupplierByIdService(prismaSupplierRepository);

    return useCase;
}