import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface FetchAllSupplierServiceResponse {
    supplier: Supplier[];
}

export class FetchAllSupplierService {
    constructor(private supplierRepository: SupplierRepository) { }

    async execute(): Promise<FetchAllSupplierServiceResponse> {
        const supplier = await this.supplierRepository.findMany();

        return {
            supplier
        };
    }
}