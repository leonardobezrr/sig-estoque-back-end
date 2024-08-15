import { beforeEach, describe, it, expect } from 'vitest';
import { CreateProductService } from './create-product';
import { InMemoryProductsRepository } from '../../repositories/in-memory/in-memory-products-repository';

const dummySupplierId = 'dummy-supplier-id';

let productRepository: InMemoryProductsRepository;
let sut: CreateProductService;

describe('Create Product Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        sut = new CreateProductService(productRepository);
    });

    it('should be able to create a new product', async () => {
        const { product } = await sut.handle({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            quantity_in_stock: 10,
            batch: 'ABC123',
            supplierId: dummySupplierId,
        });

        expect(product.id).toEqual(expect.any(String));
    });
});
