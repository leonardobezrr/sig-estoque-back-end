import { Sale } from "@prisma/client";
import { SaleRepository } from "../../repositories/sale-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FindSaleByIdServiceRequest {
    saleId: string;
}

interface FindSaleByIdServiceResponse {
    sale: Sale;
}

export class FindSaleByIdService {
    constructor(private saleRepository: SaleRepository) {

    }

    async execute({ saleId }: FindSaleByIdServiceRequest): Promise<FindSaleByIdServiceResponse> {
        const sale = await this.saleRepository.findById(saleId);

        if (!sale) {
            throw new ResourceNotFoundError();
        }

        return {
            sale
        }
    }
}