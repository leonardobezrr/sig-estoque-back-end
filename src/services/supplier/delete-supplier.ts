import { SupplierRepository } from "../../repositories/supplier-repository";

interface DeleteSupplierServiceRequest {
  id: string;
}

export class DeleteSupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({ id }: DeleteSupplierServiceRequest): Promise<void> {
    const supplier = await this.supplierRepository.delete(id);

    if (!supplier) {
      throw new Error("Supplier not found");
    }
  }
}
