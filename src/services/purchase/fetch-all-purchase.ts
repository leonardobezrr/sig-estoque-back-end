import { Purchase } from "@prisma/client";
import { PurchaseRepository } from "../../repositories/purchase-repository";

interface FetchAllPurchaseServiceResponse {
    purchase: Purchase[];
}

export class FetchAllPurchaseService {
    constructor(private purchaseRepository: PurchaseRepository) { }

    async execute(): Promise<FetchAllPurchaseServiceResponse> {
        const purchase = await this.purchaseRepository.findMany();

        return {
            purchase
        };
    }
}