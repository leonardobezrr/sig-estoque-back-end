import { beforeEach, describe, it, expect, vi } from 'vitest';
import { ReduceProductStockService } from './reduce-product-stock';
import { InMemoryProductsRepository } from '../../repositories/in-memory/in-memory-products-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let productRepository: InMemoryProductsRepository;
let reduceStockService: ReduceProductStockService;

describe('Reduce Product Stock Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        reduceStockService = new ReduceProductStockService(productRepository);
    });

    it('should reduce stock successfully when there is sufficient stock', async () => {
        // Crie um produto com estoque suficiente
        const createdProduct = await productRepository.create({
            name: 'Product with Stock',
            description: 'Product with enough stock',
            price: 100,
            quantity_in_stock: 20,
            batch: 'BATCH001',
            supplierId: 'supplier-123',
            is_active: true,
        });

        await reduceStockService.execute({
            productId: createdProduct.id,
            quantity: 10,
        });

        const updatedProduct = await productRepository.findById(createdProduct.id);
        expect(updatedProduct?.quantity_in_stock).toBe(10); // 20 - 10 = 10
    });

    it('should throw ResourceNotFoundError if the product does not exist', async () => {
        await expect(
            reduceStockService.execute({
                productId: 'non-existing-id',
                quantity: 5,
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should throw an error if product stock information is missing', async () => {
        // Crie um produto com a informação de estoque ausente
        const createdProduct = await productRepository.create({
            name: 'Product without Stock Info',
            description: 'Product with missing stock info',
            price: 100,
            quantity_in_stock: null, // Estoque ausente
            batch: 'BATCH002',
            supplierId: 'supplier-456',
            is_active: true,
        });

        await expect(
            reduceStockService.execute({
                productId: createdProduct.id,
                quantity: 5,
            })
        ).rejects.toThrow('Product stock information is missing');
    });

    it('should throw an error if there is insufficient stock', async () => {
        // Crie um produto com estoque insuficiente
        const createdProduct = await productRepository.create({
            name: 'Product with Insufficient Stock',
            description: 'Product with not enough stock',
            price: 100,
            quantity_in_stock: 5,
            batch: 'BATCH003',
            supplierId: 'supplier-789',
            is_active: true,
        });

        await expect(
            reduceStockService.execute({
                productId: createdProduct.id,
                quantity: 10,
            })
        ).rejects.toThrow('Insufficient stock');
    });
});
