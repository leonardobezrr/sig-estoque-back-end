import { beforeEach, describe, it, expect } from 'vitest';
import { PatchProductService } from './patch-product';
import { InMemoryProductsRepository } from '../../repositories/in-memory/in-memory-products-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InactiveError } from '../errors/inactive-error';

let productRepository: InMemoryProductsRepository;
let sut: PatchProductService;

describe('Patch Product Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        sut = new PatchProductService(productRepository);
    });

    it('should be able to update an existing product', async () => {
        // Primeiro, cria um produto para atualizar
        const createdProduct = await productRepository.create({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            quantity_in_stock: 10,
            batch: 'ABC123',
            supplierId: 'supplier-123',
            is_active: true,
        });

        const { product } = await sut.handle({
            id: createdProduct.id,
            data: {
                name: 'Updated Product 1',
            },
        });

        expect(product?.name).toEqual('Updated Product 1');
    });

    it('should throw ResourceNotFoundError if product does not exist', async () => {
        await expect(
            sut.handle({ id: 'non-existing-id', data: { name: 'Non-existing Product' } })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should throw InactiveError if the product is inactive', async () => {
        // Crie o produto como inativo
        const createdProduct = await productRepository.create({
            name: 'Inactive Product',
            description: 'This product is inactive',
            price: 650,
            quantity_in_stock: 8,
            batch: 'XYZ456A',
            supplierId: 'supplier-123',  // Certifique-se de fornecer todos os campos obrigatórios
            is_active: false,
        });
    
        // Atualize o produto e espere que o erro InactiveError seja lançado
        await expect(
            sut.handle({ id: createdProduct.id, data: { name: 'Updated Inactive Product' } })
        ).rejects.toBeInstanceOf(InactiveError);
    });
});
