import { Sale } from "@prisma/client";
import { SaleRepository } from "../../repositories/sale-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-repository";

interface FetchAllSaleByUserIdServiceRequest {
    userId: string;
}

interface FetchAllSaleByUserIdServiceResponse {
    sales: Sale[];
}

export class FetchAllSaleByUserIdService {
    constructor(private saleRepository: SaleRepository, private userRepository: UserRepository) {

    }

    async execute({ userId }: FetchAllSaleByUserIdServiceRequest): Promise<FetchAllSaleByUserIdServiceResponse> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        const sales = await this.saleRepository.findManyByUserId(userId);

        return {
            sales
        }
    }
}