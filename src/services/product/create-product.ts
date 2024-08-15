import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";
import { makeFindSupplierByIdService } from "../factories/supplier/make-find-supplier-by-id-service";

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
        const supplierService = makeFindSupplierByIdService();

        const { supplier } = await supplierService.execute({ supplierId });

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const product = await this.productRepository.create({
            name,
            description,
            price,
            quantity_in_stock,
            batch,
            supplier: {
                connect: {
                    id: supplierId
                }
            }
        });

        return { product };
    }
}