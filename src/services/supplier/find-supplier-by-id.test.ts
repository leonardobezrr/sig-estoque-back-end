import { beforeEach, describe, expect, it } from "vitest";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { FindSupplierByIdService } from "./find-supplier-by-id";
import { NoRecordsFoundError } from "../errors/no-records-found-error"; // Importa o erro

let supplierRepository: InMemorySuppliersRepository;
let sut: FindSupplierByIdService;

describe('Find Supplier By Id Service', () => {
    beforeEach(() => {
        supplierRepository = new InMemorySuppliersRepository();
        sut = new FindSupplierByIdService(supplierRepository);
    });

    it('should be able to find a supplier by ID', async () => {
        // Cria um fornecedor
        const createdSupplier = await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 1',
            phone_number: '123456789',
            cnpj: '12345678000100'
        });

        // Executa o serviço para buscar o fornecedor pelo ID
        const result = await sut.execute({ supplierId: createdSupplier.id });
        const supplier = result.supplier;

        // Verifica se o fornecedor encontrado possui as propriedades corretas
        expect(supplier).toHaveProperty('id', createdSupplier.id);
        expect(supplier).toHaveProperty('social_name', 'Supplier 1');
        expect(supplier).toHaveProperty('company_name', 'Company 1');
        expect(supplier).toHaveProperty('phone_number', '123456789');
        expect(supplier).toHaveProperty('cnpj', '12345678000100');

        // Verifica se o fornecedor encontrado é o mesmo que o criado
        expect(supplier.id).toBe(createdSupplier.id);
        expect(supplier.social_name).toBe(createdSupplier.social_name);
        expect(supplier.company_name).toBe(createdSupplier.company_name);
        expect(supplier.phone_number).toBe(createdSupplier.phone_number);
        expect(supplier.cnpj).toBe(createdSupplier.cnpj);
    });

    it('should throw NoRecordsFoundError if supplier is not found', async () => {
        // Espera que o serviço lance o erro NoRecordsFoundError ao buscar um fornecedor não existente
        await expect(sut.execute({ supplierId: 'non-existing-id' }))
            .rejects
            .toThrow(NoRecordsFoundError);
    });
});
