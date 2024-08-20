import { beforeEach, describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { fetchManyByCompanyName } from './fetch-many-by-company-name';
import * as makeFetchManyByCompanyNameServiceModule from '../../../services/factories/supplier/make-fetch-many-by-company-name';

// Mock do serviço de busca de fornecedores por nome da empresa
vi.mock('../../../services/factories/supplier/make-fetch-many-by-company-name', () => ({
    makeFetchManySupplierByCompanyNameService: () => ({
        execute: vi.fn().mockResolvedValue({
            supplier: [
                {
                    id: '123',
                    social_name: 'Supplier 1',
                    company_name: 'Company A',
                    phone_number: '9876543210',
                    cnpj: '12345678000100'
                },
                {
                    id: '456',
                    social_name: 'Supplier 2',
                    company_name: 'Company A',
                    phone_number: '1234567890',
                    cnpj: '09876543210000'
                }
            ]
        })
    })
}));

describe('fetchManyByCompanyName Controller', () => {
    let fastify: Fastify;

    beforeEach(() => {
        fastify = Fastify();
        fastify.get('/suppliers/company/:companyName', fetchManyByCompanyName);
    });

    it('should fetch suppliers by company name and return them', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/suppliers/company/Company%20A',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            supplier: [
                {
                    id: '123',
                    social_name: 'Supplier 1',
                    company_name: 'Company A',
                    phone_number: '9876543210',
                    cnpj: '12345678000100'
                },
                {
                    id: '456',
                    social_name: 'Supplier 2',
                    company_name: 'Company A',
                    phone_number: '1234567890',
                    cnpj: '09876543210000'
                }
            ]
        });
    });

    it('should handle errors from the service and return a 500 status code', async () => {
        // Configurar o mock para lançar um erro
        vi.spyOn(makeFetchManyByCompanyNameServiceModule, 'makeFetchManySupplierByCompanyNameService').mockReturnValue({
            execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing'))
        });

        // Redirecionar console.error para ignorar erros
        const originalConsoleError = console.error;
        console.error = () => {};

        try {
            const response = await fastify.inject({
                method: 'GET',
                url: '/suppliers/company/Company%20A',
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
