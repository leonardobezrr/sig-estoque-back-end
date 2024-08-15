import { Sale, User } from "@prisma/client"
import { SaleRepository } from "../../repositories/sale-repository"

interface CreateSaleServiceRequest {
    nf_number: string,
    user: User,
    items: {
        productId: string,
        quantity: number
    }
}

interface CreateSaleServiceResponse {
    sale: Sale
}

export class CreateSaleService {
    constructor(private saleRepository: SaleRepository) { }

    async handle({
        nf_number,
        user,
        items
    }: CreateSaleServiceRequest): Promise<CreateSaleServiceResponse> {
        const sale = await this.saleRepository.create({
            nf_number,
            user: {
                connect: {
                    id: user.id
                }
            },
            items
        })

        return {
            sale
        }
    }
}

