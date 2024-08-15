import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { PatchSupplierService } from './patch-supplier';
import { SupplierRepository } from '../../repositories/supplier-repository';
import { Supplier } from '@prisma/client';

describe('PatchSupplierService', () => {
    // Mock supplierRepository
    let supplierRepository: SupplierRepository;
    let patchSupplierService: PatchSupplierService;

    beforeEach(() => {
        supplierRepository = {
            findById: vi.fn() as Mock,
            patch: vi.fn() as Mock,
        } as unknown as SupplierRepository;

        patchSupplierService = new PatchSupplierService(supplierRepository);
    });

    it('should update supplier data if supplier exists', async () => {
        const mockSupplier = { id: '1', social_name: 'Supplier 1' } as Supplier;
        const updateData = { social_name: 'Updated Supplier' };

        (supplierRepository.findById as Mock).mockResolvedValue(mockSupplier);
        (supplierRepository.patch as Mock).mockResolvedValue({ ...mockSupplier, ...updateData });

        const result = await patchSupplierService.handle({
            id: '1',
            data: updateData,
        });

        expect(result.supplier).toEqual({ ...mockSupplier, ...updateData });
        expect(supplierRepository.findById).toHaveBeenCalledWith('1');
        expect(supplierRepository.patch).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw an error if supplier does not exist', async () => {
        (supplierRepository.findById as Mock).mockResolvedValue(null);

        await expect(
            patchSupplierService.handle({
                id: '1',
                data: { social_name: 'Updated Supplier' },
            })
        ).rejects.toThrow('Supplier not found');

        expect(supplierRepository.findById).toHaveBeenCalledWith('1');
        expect(supplierRepository.patch).not.toHaveBeenCalled();
    });
});
