import { beforeEach, describe, expect, it } from "vitest";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { FindSupplierByIdService } from "./find-supplier-by-id";

let supplierRepository: InMemorySuppliersRepository;
let sut: FindSupplierByIdService;

describe('Find Supplier By Id Service', () => {
    beforeEach(() => {
        supplierRepository = new InMemorySuppliersRepository();
        sut = new FindSupplierByIdService(supplierRepository);
    });

    it('should be able to find a supplier by ID', async () => {
        const createdSupplier = await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 1',
            phone_number: '123456789',
            cnpj: '12345678000100'
        });

        const result = await sut.execute({ supplierId: createdSupplier.id });
        const supplier = result.supplier;

        expect(supplier).toHaveProperty('id', createdSupplier.id);
        expect(supplier).toHaveProperty('social_name', 'Supplier 1');
        expect(supplier).toHaveProperty('company_name', 'Company 1');
    });

    it('should throw an error if supplier is not found', async () => {
        await expect(sut.execute({ supplierId: 'non-existing-id' })).rejects.toThrow('Supplier not found');
    });
});
