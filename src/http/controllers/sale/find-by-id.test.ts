import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { findSaleById } from './find-by-id';
import * as makeFindSaleByIdServiceModule from '../../../services/factories/sale/make-find-sale-by-id-service';

// Mock do serviço para sucesso
const mockFindSaleByIdService = {
    execute: vi.fn().mockResolvedValue({
        sale: { id: 'sale-1', nf_number: '123', userId: 'user-id', items: [] }
    }),
};

// Mock do serviço para erro
const mockFindSaleByIdServiceWithError = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated error')),
};

// Mock do serviço para venda não encontrada
const mockFindSaleByIdServiceWithNotFound = {
    execute: vi.fn().mockResolvedValue({
        sale: null
    }),
};

vi.spyOn(makeFindSaleByIdServiceModule, 'makeFindSaleByIdService').mockReturnValue(mockFindSaleByIdService);

test('should fetch sale by ID successfully', async () => {
    const app = fastify();

    // Registrar o controlador
    app.get('/sales/:id', findSaleById);

    // Fazer a requisição
    const response = await app.inject({
        method: 'GET',
        url: '/sales/sale-1',
    });

    // Verificar a resposta
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
        sale: { id: 'sale-1', nf_number: '123', userId: 'user-id', items: [] }
    });
});

test('should return 404 if sale is not found', async () => {
    const app = fastify();

    // Configurar o mock para retorno de venda não encontrada
    vi.spyOn(makeFindSaleByIdServiceModule, 'makeFindSaleByIdService').mockReturnValue(mockFindSaleByIdServiceWithNotFound);

    // Registrar o controlador
    app.get('/sales/:id', findSaleById);

    // Fazer a requisição
    const response = await app.inject({
        method: 'GET',
        url: '/sales/sale-999',
    });

    // Verificar a resposta
    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ message: 'Sale not found' });
});

test('should return 500 if an error occurs', async () => {
    const app = fastify();

    // Configurar o mock para erro
    vi.spyOn(makeFindSaleByIdServiceModule, 'makeFindSaleByIdService').mockReturnValue(mockFindSaleByIdServiceWithError);

    // Registrar o controlador
    app.get('/sales/:id', findSaleById);

    // Fazer a requisição
    const response = await app.inject({
        method: 'GET',
        url: '/sales/sale-1',
    });

    // Verificar a resposta
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ message: 'Internal Server Error' });
});
