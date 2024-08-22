import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { DeleteSupplierService } from "../../supplier/delete-supplier";

export function makeDeleteSupplierService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new DeleteSupplierService(prismaSupplierRepository);

    return useCase;
}