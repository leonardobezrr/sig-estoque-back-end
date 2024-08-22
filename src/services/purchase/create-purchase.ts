import { Purchase, Item } from "@prisma/client";
import { PurchaseRepository } from "../../repositories/purchase-repository";
import { ItemRepository } from "../../repositories/item-repository";
import { ProductRepository } from "../../repositories/product-repository";

interface CreatePurchaseServiceRequest {
    nf_number: string;
    supplierId: string;
    userId: string;
    items: {
        productId: string;
        quantity: number;
        value: number;
    }[];
}

interface CreatePurchaseServiceResponse {
    newPurchase: Purchase;
    items: Item[];
}

export class CreatePurchaseService {
    constructor(
        private purchaseRepository: PurchaseRepository,
        private itemRepository: ItemRepository,
        private productRepository: ProductRepository
    ) { }

    async handle({
        nf_number,
        supplierId,
        userId,
        items
    }: CreatePurchaseServiceRequest): Promise<CreatePurchaseServiceResponse> {
        const purchase = await this.purchaseRepository.create({
            nf_number,
            supplier: {
                connect: { id: supplierId }
            },
            user: {
                connect: { id: userId }
            },
        });

        const productsIds = items.map((item) => item.productId);

        const products = await this.productRepository.findManyByIds(productsIds);

        if (products.length !== productsIds.length) {
            throw new Error('Product not found');
        }

        products.forEach((product) => {
            if (!product.is_active) {
                throw new Error(`Product ${product.name} does not exist or is inactive`);
            }
        });

        const createdItems = await Promise.all(
            items.map(async (item) => {
                await this.productRepository.increaseStock(item.productId, item.quantity);

                return this.itemRepository.create({
                    purchase: { connect: { id: purchase.id } },
                    quantity: item.quantity,
                    value: item.value,
                    product: {
                        connect: { id: item.productId }
                    },
                });
            })
        );

        const subTotal = createdItems.reduce((acc, item) => {
            return acc + item.value * item.quantity;
        }, 0);

        const newPurchase = await this.purchaseRepository.updateSubTotal(purchase.id, subTotal);

        return {
            newPurchase,
            items: createdItems
        };
    }
}
