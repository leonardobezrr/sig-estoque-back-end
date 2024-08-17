import { Purchase } from "@prisma/client";
import { PurchaseRepository } from "../../repositories/purchase-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { SupplierRepository } from "../../repositories/supplier-repository";

interface FetchAllPurchaseBySupplierIdServiceRequest {
    supplierId: string;
}

interface FetchAllPurchaseBySupplierIdServiceResponse {
    purchases: Purchase[];
}

export class FetchAllPurchaseBySupplierIdService {
    constructor(private purchaseRepository: PurchaseRepository, private supplierRepository: SupplierRepository) {

    }

    async execute({ supplierId }: FetchAllPurchaseBySupplierIdServiceRequest): Promise<FetchAllPurchaseBySupplierIdServiceResponse> {
        const supplier = await this.supplierRepository.findById(supplierId);

        if (!supplier) {
            throw new ResourceNotFoundError();
        }

        const purchases = await this.purchaseRepository.findManyBySupplierId(supplierId);

        return {
            purchases
        }
    }
}