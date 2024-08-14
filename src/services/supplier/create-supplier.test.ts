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
            phone_number: '9876543210', // Phone number with 10 digits
            cnpj: '12345678000100'
        });
    
        const { supplier } = await sut.handle({
            social_name: 'Supplier 2',
            company_name: 'Company 2',
            phone_number: '9876543210', // Phone number with 10 digits
            cnpj: '98765432000100'
        });
    
        expect(supplier.id).toEqual(expect.any(String));
    });
    

    it('should throw an error if any required field is missing or invalid', async () => {
        const invalidData = [
            { social_name: '', company_name: 'Company 1', phone_number: '123456789', cnpj: '12345678000100' }, // Empty social_name
            { social_name: 'Supplier 1', company_name: '', phone_number: '123456789', cnpj: '12345678000100' }, // Empty company_name
            { social_name: 'Supplier 1', company_name: 'Company 1', phone_number: '', cnpj: '12345678000100' }, // Empty phone_number
            { social_name: 'Supplier 1', company_name: 'Company 1', phone_number: '123456789', cnpj: '' }, // Empty cnpj
            { social_name: 'Supplier 1', company_name: 'Company 1', phone_number: '123', cnpj: '12345678000100' }, // Invalid phone_number
            { social_name: 'Supplier 1', company_name: 'Company 1', phone_number: '123456789', cnpj: '12345678' } // Invalid cnpj
        ];

        for (const data of invalidData) {
            await expect(() => 
                sut.handle(data as any)
            ).rejects.toThrow('Invalid data provided');
        }
    });
});
