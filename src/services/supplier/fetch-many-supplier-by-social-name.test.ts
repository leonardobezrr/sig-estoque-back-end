import { beforeEach, describe, expect, it } from "vitest";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { FetchManySupplierByCompanyNameService } from "./fetch-many-supplier-by-company-name";

let supplierRepository: InMemorySuppliersRepository;
let sut: FetchManySupplierByCompanyNameService;

describe('Fetch Many Supplier By Company Name Service', () => {
    beforeEach(() => {
        supplierRepository = new InMemorySuppliersRepository();
        sut = new FetchManySupplierByCompanyNameService(supplierRepository);
    });

    it('should be able to fetch suppliers by company name', async () => {
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
            social_name: 'Supplier 3',
            company_name: 'Company 1',
            phone_number: '111111111',
            cnpj: '11111111000100'
        });

        const result = await sut.execute({ companyName: 'Company 1' });
        const suppliers = result.supplier;

        expect(suppliers).toHaveLength(2);
        expect(suppliers[0]).toHaveProperty('company_name', 'Company 1');
        expect(suppliers[1]).toHaveProperty('company_name', 'Company 1');
    });
});
