import { beforeEach, describe, it, expect } from "vitest";
import { CreateSupplierService } from "./create-supplier";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";

let supplierRepository: InMemorySuppliersRepository;
let sut: CreateSupplierService;

describe('Create Supplier Service', () => {
    beforeEach(() => {
        supplierRepository = new InMemorySuppliersRepository();
        sut = new CreateSupplierService(supplierRepository);
    });

    it('should be able to create a new supplier', async () => {
        await supplierRepository.create({
            social_name: 'Supplier 1',
            company_name: 'Company 1',
            phone_number: '9876543210',
            cnpj: '12345678000100'
        });
    
        const { supplier } = await sut.handle({
            social_name: 'Supplier 2',
            company_name: 'Company 2',
            phone_number: '9876543210',
            cnpj: '98765432000100'
        });
    
        expect(supplier.id).toEqual(expect.any(String));
    });
    
});
