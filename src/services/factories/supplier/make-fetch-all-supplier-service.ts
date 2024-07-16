import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { FetchAllSupplierService } from "../../supplier/fetch-all-supplier";


export function makeFetchAllSupplierService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new FetchAllSupplierService(prismaSupplierRepository);

    return useCase;
}