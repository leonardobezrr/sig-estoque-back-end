import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { FetchManySupplierBySocialNameService } from "../../supplier/fetch-many-supplier-by-social-name";


export function makeFetchManySupplierBySocialNameService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new FetchManySupplierBySocialNameService(prismaSupplierRepository);

    return useCase;
}