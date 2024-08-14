import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

interface CreateProductServiceRequest {
    name: string;
    description: string;
    price: number;
    supplierId: string;
    quantity_in_stock: number,
    batch: string
}

interface CreateProductServiceResponse {
    product: Product
}

export class CreateProductService {
    constructor(private productRepository: ProductRepository) { }

    async handle({
        name,
        description,
        price,
        quantity_in_stock,
        batch,
        supplierId,
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
        // Validação dos dados
        if (!name || !description || price == null || quantity_in_stock == null || !batch || !supplierId) {
            throw new Error('Invalid data provided');
        }

        if (price <= 0) {
            throw new Error('Invalid data provided');
        }

        if (quantity_in_stock < 0) {
            throw new Error('Invalid data provided');
        }

        // Criação do produto
        const product = await this.productRepository.create({
            name,
            description,
            price,
            quantity_in_stock,
            batch,
            supplierId,
        });

        return { product };
    }
}