import { beforeEach, describe, it, expect } from "vitest";
import { DeleteSupplierService } from "./delete-supplier";
import { InMemorySuppliersRepository } from "../../repositories/in-memory/in-memory-supplier-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

let supplierRepository: InMemorySuppliersRepository;
let sut: DeleteSupplierService;

describe('Delete Supplier Service', () => {
  beforeEach(() => {
    supplierRepository = new InMemorySuppliersRepository();
    sut = new DeleteSupplierService(supplierRepository);
  });

  it('should be able to delete a supplier by ID', async () => {
    const createdSupplier = await supplierRepository.create({
      social_name: 'Supplier 1',
      company_name: 'Company 1',
      phone_number: '9876543210',
      cnpj: '12345678000100'
    });

    await sut.execute({ id: createdSupplier.id });

    const foundSupplier = await supplierRepository.findById(createdSupplier.id);
    expect(foundSupplier).toBeNull();
  });

  it('should throw an error if the supplier does not exist', async () => {
    await expect(sut.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(NoRecordsFoundError);
  });
});
