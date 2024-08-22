import { Purchase } from "@prisma/client";
import { PurchaseRepository } from "../../repositories/purchase-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-repository";

interface FetchAllPurchaseByUserIdServiceRequest {
    userId: string;
}

interface FetchAllPurchaseByUserIdServiceResponse {
    purchases: Purchase[];
}

export class FetchAllPurchaseByUserIdService {
    constructor(private purchaseRepository: PurchaseRepository, private userRepository: UserRepository) {

    }

    async execute({ userId }: FetchAllPurchaseByUserIdServiceRequest): Promise<FetchAllPurchaseByUserIdServiceResponse> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        const purchases = await this.purchaseRepository.findManyByUserId(userId);

        return {
            purchases
        }
    }
}