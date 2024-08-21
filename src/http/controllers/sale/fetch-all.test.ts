import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { fetchAllSale } from './fetch-all';
import * as makeFetchAllSaleServiceModule from '../../../services/factories/sale/make-fetch-all-sale-service';

// Mock do serviço para sucesso
const mockFetchAllSaleService = {
    execute: vi.fn().mockResolvedValue({
        sale: [
            { id: 'sale-1', nf_number: '123', userId: 'user-id', items: [] },
            { id: 'sale-2', nf_number: '456', userId: 'user-id', items: [] }
        ]
    }),
};

// Mock do serviço para erro
const mockFetchAllSaleServiceWithError = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated error')),
};

vi.spyOn(makeFetchAllSaleServiceModule, 'makeFetchAllSaleService').mockReturnValue(mockFetchAllSaleService);

test('should fetch all sales successfully', async () => {
    const app = fastify();

    // Registrar o controlador
    app.get('/sales', fetchAllSale);

    // Fazer a requisição
    const response = await app.inject({
        method: 'GET',
        url: '/sales',
    });

    // Verificar a resposta
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
        sale: [
            { id: 'sale-1', nf_number: '123', userId: 'user-id', items: [] },
            { id: 'sale-2', nf_number: '456', userId: 'user-id', items: [] }
        ]
    });
});

test('should return 500 if an error occurs', async () => {
    const app = fastify();

    // Configurar o mock para retornar um erro
    vi.spyOn(makeFetchAllSaleServiceModule, 'makeFetchAllSaleService').mockReturnValue(mockFetchAllSaleServiceWithError);

    // Registrar o controlador
    app.get('/sales', fetchAllSale);

    // Fazer a requisição
    const response = await app.inject({
        method: 'GET',
        url: '/sales',
    });

    // Verificar a resposta
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ message: 'Internal Server Error' });
});
