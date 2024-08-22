import { beforeEach, describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { fetchManyBySocialName } from './fetch-many-by-social-name';
import * as makeFetchManyBySocialNameServiceModule from '../../../services/factories/supplier/make-fetch-many-by-social-name';

// Mock do serviço de busca de fornecedores por nome social
vi.mock('../../../services/factories/supplier/make-fetch-many-by-social-name', () => ({
    makeFetchManySupplierBySocialNameService: () => ({
        execute: vi.fn().mockResolvedValue({
            supplier: [
                {
                    id: '789',
                    social_name: 'Supplier 3',
                    company_name: 'Company B',
                    phone_number: '1122334455',
                    cnpj: '56789012345678'
                },
                {
                    id: '012',
                    social_name: 'Supplier 4',
                    company_name: 'Company B',
                    phone_number: '2233445566',
                    cnpj: '87654321098765'
                }
            ]
        })
    })
}));

describe('fetchManyBySocialName Controller', () => {
    let fastify: Fastify;

    beforeEach(() => {
        fastify = Fastify();
        fastify.get('/suppliers/social/:socialName', fetchManyBySocialName);
    });

    it('should fetch suppliers by social name and return them', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/suppliers/social/Supplier%203',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            supplier: [
                {
                    id: '789',
                    social_name: 'Supplier 3',
                    company_name: 'Company B',
                    phone_number: '1122334455',
                    cnpj: '56789012345678'
                },
                {
                    id: '012',
                    social_name: 'Supplier 4',
                    company_name: 'Company B',
                    phone_number: '2233445566',
                    cnpj: '87654321098765'
                }
            ]
        });
    });

    it('should handle errors from the service and return a 500 status code', async () => {
        // Configurar o mock para lançar um erro
        vi.spyOn(makeFetchManyBySocialNameServiceModule, 'makeFetchManySupplierBySocialNameService').mockReturnValue({
            execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing'))
        });

        // Redirecionar console.error para ignorar erros
        const originalConsoleError = console.error;
        console.error = () => {};

        try {
            const response = await fastify.inject({
                method: 'GET',
                url: '/suppliers/social/Supplier%203',
            });

            expect(response.statusCode).toBe(500);
            expect(response.json()).toEqual({
                error: 'Internal Server Error',
                message: 'An error occurred while fetching suppliers',
                statusCode: 500
            });
        } finally {
            // Restaurar console.error
            console.error = originalConsoleError;
        }
    });
});
