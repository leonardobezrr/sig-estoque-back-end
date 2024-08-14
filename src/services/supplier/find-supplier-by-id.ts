import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error"; // Importa a classe de erro personalizada

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
            // Lança o erro NoRecordsFoundError se o fornecedor não for encontrado
            throw new NoRecordsFoundError();
        }

        return {
            supplier
        };
    }
}
