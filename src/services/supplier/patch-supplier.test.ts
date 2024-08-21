import { beforeEach, describe, it, expect } from "vitest";
import { PatchSupplierService } from "./patch-supplier";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

let supplierRepository: InMemorySuppliersRepository;
let sut: PatchSupplierService;

describe('Patch Supplier Service', () => {
    beforeEach(() => {
        supplierRepository = new InMemorySuppliersRepository();
        sut = new PatchSupplierService(supplierRepository);
    });

    it('should be able to patch an existing supplier', async () => {
        const createdSupplier = await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 1',
            phone_number: '9876543210',
            cnpj: '12345678000100',
        });

        const { supplier } = await sut.handle({
            id: createdSupplier.id,
            data: {
                social_name: 'Updated Supplier 1',
                company_name: 'Updated Company 1',
            }
        });

        expect(supplier).toHaveProperty('id', createdSupplier.id);
        expect(supplier).toHaveProperty('social_name', 'Updated Supplier 1');
        expect(supplier).toHaveProperty('company_name', 'Updated Company 1');
    });

    it('should throw an error if the supplier does not exist', async () => {
        await expect(sut.handle({
            id: 'non-existing-id',
            data: {
                social_name: 'Non-existent Supplier',
            }
        })).rejects.toThrow(NoRecordsFoundError);
    });
});
