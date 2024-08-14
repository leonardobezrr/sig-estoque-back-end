// fetch-many-supplier-by-social-name.test.ts

import { beforeEach, describe, expect, it } from "vitest";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { FetchManySupplierBySocialNameService } from "./fetch-many-supplier-by-social-name";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

let supplierRepository: InMemorySuppliersRepository;
let sut: FetchManySupplierBySocialNameService;

describe('Fetch Many Supplier By Social Name Service', () => {
    beforeEach(() => {
        supplierRepository = new InMemorySuppliersRepository();
        sut = new FetchManySupplierBySocialNameService(supplierRepository);
    });

    it('should be able to fetch suppliers by social name', async () => {
        await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 1',
            phone_number: '123456789',
            cnpj: '12345678000100'
        });

        await supplierRepository.create({
            social_name: 'Supplier 2',
            company_name: 'Company 2',
            phone_number: '987654321',
            cnpj: '98765432000100'
        });

        await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 3',
            phone_number: '111111111',
            cnpj: '11111111000100'
        });

        // Busca por fornecedores com social_name "Supplier 1"
        const result = await sut.execute({ socialName: 'Supplier 1' });
        const suppliers = result.suppliers;

        // Verificar a quantidade de fornecedores retornados
        expect(suppliers).toHaveLength(2);

        // Verificar se todos os fornecedores retornados têm o social_name correto
        suppliers.forEach(supplier => {
            expect(supplier).toHaveProperty('social_name', 'Supplier 1');
            expect(supplier).toHaveProperty('company_name');
            expect(supplier).toHaveProperty('phone_number');
            expect(supplier).toHaveProperty('cnpj');
            
            // Verificar que os campos não estão vazios
            expect(supplier.company_name).not.toBe('');
            expect(supplier.phone_number).not.toBe('');
            expect(supplier.cnpj).not.toBe('');
        });
    });

    it('should be able to fetch suppliers by multiple social names', async () => {
        await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 1',
            phone_number: '123456789',
            cnpj: '12345678000100'
        });

        await supplierRepository.create({
            social_name: 'Supplier 2',
            company_name: 'Company 2',
            phone_number: '987654321',
            cnpj: '98765432000100'
        });

        await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 3',
            phone_number: '111111111',
            cnpj: '11111111000100'
        });

        // Busca por fornecedores com social_name "Supplier 1"
        const resultSupplier1 = await sut.execute({ socialName: 'Supplier 1' });
        const suppliersSupplier1 = resultSupplier1.suppliers;

        expect(suppliersSupplier1).toHaveLength(2);
        suppliersSupplier1.forEach(supplier => {
            expect(supplier).toHaveProperty('social_name', 'Supplier 1');
        });

        // Busca por fornecedores com social_name "Supplier 2"
        const resultSupplier2 = await sut.execute({ socialName: 'Supplier 2' });
        const suppliersSupplier2 = resultSupplier2.suppliers;

        expect(suppliersSupplier2).toHaveLength(1);
        suppliersSupplier2.forEach(supplier => {
            expect(supplier).toHaveProperty('social_name', 'Supplier 2');
        });
    });

    it('should throw NoRecordsFoundError if no suppliers are found for the given social name', async () => {
        await expect(sut.execute({ socialName: 'NonExistingSupplier' }))
            .rejects
            .toThrow(NoRecordsFoundError);
    });
});
