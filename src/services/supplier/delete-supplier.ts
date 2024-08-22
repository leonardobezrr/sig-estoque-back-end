import { SupplierRepository } from "../../repositories/supplier-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

interface DeleteSupplierServiceRequest {
  id: string;
}

export class DeleteSupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({ id }: DeleteSupplierServiceRequest): Promise<void> {
    const supplier = await this.supplierRepository.delete(id);

    if (!supplier) {
      throw new NoRecordsFoundError;
    }
  }
}
