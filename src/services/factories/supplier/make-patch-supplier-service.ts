import { PrismaSupplierRepository } from "../../../repositories/prisma/prisma-supplier-repository";
import { PatchSupplierService } from "../../supplier/patch-supplier";

export function makePatchSupplierService() {
    const prismaSupplierRepository = new PrismaSupplierRepository();
    const useCase = new PatchSupplierService(prismaSupplierRepository);

    return useCase;
}