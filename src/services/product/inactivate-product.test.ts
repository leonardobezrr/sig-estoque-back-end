import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../repositories/in-memory/in-memory-products-repository";
import { InactivateProductService } from "./inactivate-product";

const dummySupplierId = 'dummy-supplier-id';

let productRepository: InMemoryProductsRepository;
let sut: InactivateProductService;

describe('Inactivate Product Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        sut = new InactivateProductService(productRepository);
    });

    it('should be able to inactivate a product by id', async () => {
        const createdProduct = await productRepository.create({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            quantity_in_stock: 10,
            batch: 'ABC123',
            supplierId: dummySupplierId
        });

        await sut.execute({
            productId: createdProduct.id
        });

        const inactivatedProduct = await productRepository.findById(createdProduct.id);

        expect(inactivatedProduct).not.toBeNull();
        expect(inactivatedProduct!.is_active).toBe(false);
    });

    it('should not be able to inactivate a product with wrong id', async () => {
        await expect(() =>
            sut.execute({
                productId: 'non-existing-id'
            })).rejects.toThrow('Product not found');
    });
});
