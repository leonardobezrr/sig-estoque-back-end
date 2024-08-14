import { beforeEach, describe, it, expect } from 'vitest';
import { CreateProductService } from './create-product';
import { InMemoryProductsRepository } from '../../repositories/in-memory/in-memory-products-repository';

// Supondo que você tem um fornecedor fictício com um ID para teste
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

    it('should throw an error if any required field is missing or invalid', async () => {
        const invalidData = [
            { name: '', description: 'Description', price: 100, quantity_in_stock: 10, batch: 'ABC123', supplierId: dummySupplierId }, // Empty name
            { name: 'Product', description: '', price: 100, quantity_in_stock: 10, batch: 'ABC123', supplierId: dummySupplierId }, // Empty description
            { name: 'Product', description: 'Description', price: -100, quantity_in_stock: 10, batch: 'ABC123', supplierId: dummySupplierId }, // Negative price
            { name: 'Product', description: 'Description', price: 100, quantity_in_stock: -10, batch: 'ABC123', supplierId: dummySupplierId }, // Negative quantity
            { name: 'Product', description: 'Description', price: 100, quantity_in_stock: 10, batch: '', supplierId: dummySupplierId }, // Empty batch
            { name: 'Product', description: 'Description', price: 100, quantity_in_stock: 10, batch: 'ABC123', supplierId: '' }, // Empty supplierId
        ];

        for (const data of invalidData) {
            await expect(() => 
                sut.handle(data)
            ).rejects.toThrow('Invalid data provided');
        }
    });
});
