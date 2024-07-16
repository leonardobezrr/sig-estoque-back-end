import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface FetchManySupplierBySocialNameServiceRequest {
    socialName: string;
}

interface FetchManySupplierBySocialNameServiceResponse {
    supplier: Supplier[];
}

export class FetchManySupplierBySocialNameService {
    constructor(private supplierRepository: SupplierRepository) { }

    async execute({ socialName }: FetchManySupplierBySocialNameServiceRequest): Promise<FetchManySupplierBySocialNameServiceResponse> {
        const supplier = await this.supplierRepository.findManyBySocialName(socialName);

        return {
            supplier
        };
    }
}