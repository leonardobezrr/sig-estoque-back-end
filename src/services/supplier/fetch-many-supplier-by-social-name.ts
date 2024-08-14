// fetch-many-supplier-by-social-name.ts

import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

interface FetchManySupplierBySocialNameServiceRequest {
    socialName: string;
}

interface FetchManySupplierBySocialNameServiceResponse {
    suppliers: Supplier[];
}

export class FetchManySupplierBySocialNameService {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({ socialName }: FetchManySupplierBySocialNameServiceRequest): Promise<FetchManySupplierBySocialNameServiceResponse> {
        const suppliers = await this.supplierRepository.findManyBySocialName(socialName);

        if (suppliers.length === 0) {
            throw new NoRecordsFoundError();
        }

        return {
            suppliers
        };
    }
}
