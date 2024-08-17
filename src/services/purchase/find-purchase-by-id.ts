import { Purchase } from "@prisma/client";
import { PurchaseRepository } from "../../repositories/purchase-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FindPurchaseByIdServiceRequest {
    purchaseId: string;
}

interface FindPurchaseByIdServiceResponse {
    purchase: Purchase;
}

export class FindPurchaseByIdService {
    constructor(private purchaseRepository: PurchaseRepository) {

    }

    async execute({ purchaseId }: FindPurchaseByIdServiceRequest): Promise<FindPurchaseByIdServiceResponse> {
        const purchase = await this.purchaseRepository.findById(purchaseId);

        if (!purchase) {
            throw new ResourceNotFoundError();
        }

        return {
            purchase
        }
    }
}