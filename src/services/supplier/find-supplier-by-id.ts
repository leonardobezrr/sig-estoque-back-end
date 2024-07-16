import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface FindSupplierByIdServiceRequest {
    supplierId: string;
}

interface FindSupplierByIdServiceResponse {
    supplier: Supplier;
}

export class FindSupplierByIdService {
    constructor(private supplierRepository: SupplierRepository) {

    }

    async execute({ supplierId }: FindSupplierByIdServiceRequest): Promise<FindSupplierByIdServiceResponse> {
        const supplier = await this.supplierRepository.findById(supplierId);

        if (!supplier) {
            //TODO: Create a custom error class
            throw new Error('Supplier not found');
        }

        return {
            supplier
        }
    }
}