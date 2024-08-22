import { beforeEach, describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { patchSupplier } from './patch';
import * as makePatchSupplierServiceModule from '../../../services/factories/supplier/make-patch-supplier-service';

// Mock do serviço de patch do fornecedor
vi.mock('../../../services/factories/supplier/make-patch-supplier-service', () => ({
    makePatchSupplierService: () => ({
        handle: vi.fn().mockResolvedValue({
            supplier: {
                id: '123',
                social_name: 'Updated Supplier',
                company_name: 'Updated Company',
                phone_number: '1111111111',
                cnpj: '99999999999999'
            }
        })
    })
}));

describe('patchSupplier Controller', () => {
    let fastify: Fastify;

    beforeEach(() => {
        fastify = Fastify();
        fastify.patch('/suppliers/:id', patchSupplier);
    });

    it('should update supplier and return the updated supplier', async () => {
        const response = await fastify.inject({
            method: 'PATCH',
            url: '/suppliers/123',
            payload: {
                social_name: 'Updated Supplier',
                company_name: 'Updated Company',
                phone_number: '1111111111',
                cnpj: '99999999999999'
            }
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            supplier: {
                id: '123',
                social_name: 'Updated Supplier',
                company_name: 'Updated Company',
                phone_number: '1111111111',
                cnpj: '99999999999999'
            }
        });
    });

    it('should handle validation errors and return a 400 status code', async () => {
        const response = await fastify.inject({
            method: 'PATCH',
            url: '/suppliers/123',
            payload: {
                // Enviando dados inválidos para provocar erro de validação
                social_name: 12345 // Deve ser uma string
            }
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid input'
        });
    });

    it('should handle errors from the service and return a 500 status code', async () => {
        // Configurar o mock para lançar um erro
        vi.spyOn(makePatchSupplierServiceModule, 'makePatchSupplierService').mockReturnValue({
            handle: vi.fn().mockRejectedValue(new Error('Simulated error for testing'))
        });

        // Redirecionar console.error para ignorar erros
        const originalConsoleError = console.error;
        console.error = () => {};

        try {
            const response = await fastify.inject({
                method: 'PATCH',
                url: '/suppliers/123',
                payload: {
                    social_name: 'Updated Supplier'
                }
            });

            expect(response.statusCode).toBe(500);
            expect(response.json()).toEqual({
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'An error occurred while updating the supplier'
            });
        } finally {
            // Restaurar console.error
            console.error = originalConsoleError;
        }
    });
});
