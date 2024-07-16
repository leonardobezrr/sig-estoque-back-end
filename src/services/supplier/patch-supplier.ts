import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface PatchSupplierServiceRequest {
    id: string;
    data: {
        social_name?: string;
        company_name?: string;
        phone_number?: string;
        cnpj?: string;
    };
}

interface PatchSupplierServiceResponse {
    supplier: Supplier | null;
}

export class PatchSupplierService {
    constructor(private supplierRepository: SupplierRepository) { }

    async handle({ id, data }: PatchSupplierServiceRequest): Promise<PatchSupplierServiceResponse> {
        const supplierExists = await this.supplierRepository.findById(id);

        if (!supplierExists) {
            throw new Error('Supplier not found');
        }

        const supplier = await this.supplierRepository.patch(id, data);

        return {
            supplier
        };
    }
}
