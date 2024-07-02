import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { FetchManySupplierByCompanyNameService } from "../../supplier/fetch-many-supplier-by-company-name";


export function makeFetchManySupplierByCompanyNameService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new FetchManySupplierByCompanyNameService(prismaSupplierRepository);

    return useCase;
}