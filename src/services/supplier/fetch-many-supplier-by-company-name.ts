import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface FetchManySupplierByCompanyNameServiceRequest {
    companyName: string;
}

interface FetchManySupplierByCompanyNameServiceResponse {
    supplier: Supplier[];
}

export class FetchManySupplierByCompanyNameService {
    constructor(private supplierRepository: SupplierRepository) { }

    async execute({ companyName }: FetchManySupplierByCompanyNameServiceRequest): Promise<FetchManySupplierByCompanyNameServiceResponse> {
        const supplier = await this.supplierRepository.findManyByCompanyName(companyName);

        return {
            supplier
        };
    }
}