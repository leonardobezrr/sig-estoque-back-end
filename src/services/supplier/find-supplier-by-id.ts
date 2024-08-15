import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

interface FindSupplierByIdServiceRequest {
    supplierId: string;
}

interface FindSupplierByIdServiceResponse {
    supplier: Supplier;
}

export class FindSupplierByIdService {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({ supplierId }: FindSupplierByIdServiceRequest): Promise<FindSupplierByIdServiceResponse> {
        const supplier = await this.supplierRepository.findById(supplierId);

        if (!supplier) {
            throw new NoRecordsFoundError();
        }

        return {
            supplier
        };
    }
}
