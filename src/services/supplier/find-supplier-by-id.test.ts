import { beforeEach, describe, expect, it } from "vitest";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { FindSupplierByIdService } from "./find-supplier-by-id";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

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
        expect(supplier).toHaveProperty('phone_number', '123456789');
        expect(supplier).toHaveProperty('cnpj', '12345678000100');

        expect(supplier.id).toBe(createdSupplier.id);
        expect(supplier.social_name).toBe(createdSupplier.social_name);
        expect(supplier.company_name).toBe(createdSupplier.company_name);
        expect(supplier.phone_number).toBe(createdSupplier.phone_number);
        expect(supplier.cnpj).toBe(createdSupplier.cnpj);
    });

    it('should throw NoRecordsFoundError if supplier is not found', async () => {
        await expect(sut.execute({ supplierId: 'non-existing-id' }))
            .rejects
            .toThrow(NoRecordsFoundError);
    });
});
