import { Sale } from "@prisma/client";
import { SaleRepository } from "../../repositories/sale-repository";

interface FetchAllSaleServiceResponse {
    sale: Sale[];
}

export class FetchAllSaleService {
    constructor(private saleRepository: SaleRepository) { }

    async execute(): Promise<FetchAllSaleServiceResponse> {
        const sale = await this.saleRepository.findMany();

        return {
            sale
        };
    }
}