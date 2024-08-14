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

// Serviço de Criação do Fornecedor
export class CreateSupplierService {
    constructor(private supplierRepository: SupplierRepository) { }

    async handle({
        social_name,
        company_name,
        phone_number,
        cnpj,
    }: CreateSupplierServiceRequest): Promise<CreateSupplierServiceResponse> {
        // Validação dos dados
        if (!social_name || !company_name || !phone_number || !cnpj) {
            throw new Error('Invalid data provided');
        }

        if (phone_number.length !== 10) { // Ajuste conforme a política de telefone
            throw new Error('Invalid data provided');
        }

        if (cnpj.length !== 14) { // Ajuste conforme a política de CNPJ
            throw new Error('Invalid data provided');
        }

        // Criação do fornecedor
        const supplier = await this.supplierRepository.create({
            social_name,
            company_name,
            phone_number,
            cnpj,
        });

        return { supplier };
    }
}