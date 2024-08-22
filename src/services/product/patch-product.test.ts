import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { PatchProductService } from './patch-product';
import { ProductRepository } from '../../repositories/product-repository';
import { Product } from '@prisma/client';

describe('PatchProductService', () => {
    // Mock productRepository
    let productRepository: ProductRepository;
    let patchProductService: PatchProductService;

    beforeEach(() => {
        productRepository = {
            findById: vi.fn() as Mock,
            patch: vi.fn() as Mock,
        } as unknown as ProductRepository;

        patchProductService = new PatchProductService(productRepository);
    });

    it('should update product data if product exists and is active', async () => {
        const mockProduct = { id: '1', name: 'Product 1', is_active: true } as Product;
        const updateData = { name: 'Updated Product' };

        (productRepository.findById as Mock).mockResolvedValue(mockProduct);
        (productRepository.patch as Mock).mockResolvedValue({ ...mockProduct, ...updateData });

        const result = await patchProductService.handle({
            id: '1',
            data: updateData,
        });

        expect(result.product).toEqual({ ...mockProduct, ...updateData });
        expect(productRepository.findById).toHaveBeenCalledWith('1');
        expect(productRepository.patch).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw an error if product does not exist', async () => {
        (productRepository.findById as Mock).mockResolvedValue(null);

        await expect(
            patchProductService.handle({
                id: '1',
                data: { name: 'Updated Product' },
            })
        ).rejects.toThrow('Product not found');

        expect(productRepository.findById).toHaveBeenCalledWith('1');
        expect(productRepository.patch).not.toHaveBeenCalled();
    });

    it('should throw an error if product is inactive', async () => {
        const mockProduct = { id: '1', name: 'Product 1', is_active: false } as Product;

        (productRepository.findById as Mock).mockResolvedValue(mockProduct);

        await expect(
            patchProductService.handle({
                id: '1',
                data: { name: 'Updated Product' },
            })
        ).rejects.toThrow('Product does not exist or is inactive');

        expect(productRepository.findById).toHaveBeenCalledWith('1');
        expect(productRepository.patch).not.toHaveBeenCalled();
    });
});
