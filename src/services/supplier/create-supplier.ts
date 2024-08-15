import { Supplier } from "@prisma/client";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface CreateSupplierServiceRequest {
    social_name: string,
    company_name: string,
    phone_number: string,
    cnpj: string
}

interface CreateSupplierServiceResponse {
    supplier: Supplier
}

export class CreateSupplierService {
    constructor(private supplierRepository: SupplierRepository) { }

    async handle({
        social_name,
        company_name,
        phone_number,
        cnpj,
    }: CreateSupplierServiceRequest): Promise<CreateSupplierServiceResponse> {

        const supplier = await this.supplierRepository.create({
            social_name,
            company_name,
            phone_number,
            cnpj,
        });

        return { supplier };
    }
}