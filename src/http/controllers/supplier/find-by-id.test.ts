import { beforeEach, describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { findSupplierById } from './find-by-id';
import * as makeFindSupplierByIdServiceModule from '../../../services/factories/supplier/make-find-supplier-by-id-service';

// Mock do serviço de busca de fornecedor por ID
vi.mock('../../../services/factories/supplier/make-find-supplier-by-id-service', () => ({
    makeFindSupplierByIdService: () => ({
        execute: vi.fn().mockResolvedValue({
            supplier: {
                id: '123',
                social_name: 'Supplier 1',
                company_name: 'Company A',
                phone_number: '9876543210',
                cnpj: '12345678000100'
            }
        })
    })
}));

describe('findSupplierById Controller', () => {
    let fastify: Fastify;

    beforeEach(() => {
        fastify = Fastify();
        fastify.get('/suppliers/:id', findSupplierById);
    });

    it('should fetch supplier by ID and return it', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/suppliers/123',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            supplier: {
                id: '123',
                social_name: 'Supplier 1',
                company_name: 'Company A',
                phone_number: '9876543210',
                cnpj: '12345678000100'
            }
        });
    });

    it('should handle errors from the service and return a 500 status code', async () => {
        // Configurar o mock para lançar um erro
        vi.spyOn(makeFindSupplierByIdServiceModule, 'makeFindSupplierByIdService').mockReturnValue({
            execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing'))
        });

        // Redirecionar console.error para ignorar erros
        const originalConsoleError = console.error;
        console.error = () => {};

        try {
            const response = await fastify.inject({
                method: 'GET',
                url: '/suppliers/123',
            });

            expect(response.statusCode).toBe(500);
            expect(response.json()).toEqual({
                error: 'Internal Server Error',
                message: 'An error occurred while fetching the supplier',
                statusCode: 500
            });
        } finally {
            // Restaurar console.error
            console.error = originalConsoleError;
        }
    });
});
