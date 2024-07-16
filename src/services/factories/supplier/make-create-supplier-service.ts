import { CreateSupplierService } from "../../supplier/create-supplier";
import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";

export function makeCreateSupplierService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new CreateSupplierService(prismaSupplierRepository);

    return useCase;
}