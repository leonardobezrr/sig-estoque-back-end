import { beforeEach, describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { deleteSupplier } from './delete';
import * as makeDeleteSupplierServiceModule from '../../../services/factories/supplier/make-delete-supplier-service';

// Mock do serviço de exclusão de fornecedor
vi.mock('../../../services/factories/supplier/make-delete-supplier-service', () => ({
    makeDeleteSupplierService: () => ({
        execute: vi.fn().mockResolvedValue(undefined) // Não há retorno esperado, mas o método deve ser resolvido
    })
}));

describe('deleteSupplier Controller', () => {
    let fastify: Fastify;

    beforeEach(() => {
        fastify = Fastify();
        fastify.delete('/suppliers/:id', deleteSupplier);
    });

    it('should delete a supplier and return a 204 status', async () => {
        const response = await fastify.inject({
            method: 'DELETE',
            url: '/suppliers/123',
        });

        expect(response.statusCode).toBe(204);
        expect(response.body).toBe(''); // Corpo da resposta deve estar vazio para status 204
    });

    it('should handle errors from the service and return a 500 status code', async () => {
        // Configurar o mock para lançar um erro
        vi.spyOn(makeDeleteSupplierServiceModule, 'makeDeleteSupplierService').mockReturnValue({
            execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing'))
        });

        // Redirecionar console.error para ignorar erros
        const originalConsoleError = console.error;
        console.error = () => {};

        try {
            const response = await fastify.inject({
                method: 'DELETE',
                url: '/suppliers/123',
            });

            expect(response.statusCode).toBe(500);
            expect(response.json()).toEqual({
                error: 'Internal Server Error',
                message: 'Simulated error for testing',
                statusCode: 500
            });
        } finally {
            // Restaurar console.error
            console.error = originalConsoleError;
        }
    });
});
