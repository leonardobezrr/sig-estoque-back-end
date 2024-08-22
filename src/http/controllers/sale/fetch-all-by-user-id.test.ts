import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { fetchAllSaleByUserId } from './fetch-all-by-user-id';
import * as makeFetchAllSaleByUserIdServiceModule from '../../../services/factories/sale/make-fetch-all-sale-by-user-id';

test('should fetch all sales for a valid userId', async () => {
    const app = fastify();

    app.get('/sales/:userId', fetchAllSaleByUserId);

    const mockFetchAllSaleByUserIdService = {
        execute: vi.fn().mockResolvedValue({
            sales: [
                { id: 'sale-1', nf_number: '123', userId: 'user-id', items: [] },
                { id: 'sale-2', nf_number: '456', userId: 'user-id', items: [] }
            ]
        }),
    };

    vi.spyOn(makeFetchAllSaleByUserIdServiceModule, 'makeFetchAllSaleByUserIdService').mockReturnValue(mockFetchAllSaleByUserIdService);

    const response = await app.inject({
        method: 'GET',
        url: '/sales/user-id',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
        sales: [
            { id: 'sale-1', nf_number: '123', userId: 'user-id', items: [] },
            { id: 'sale-2', nf_number: '456', userId: 'user-id', items: [] }
        ]
    });
});

test('should handle service errors', async () => {
    const app = fastify();

    app.get('/sales/:userId', fetchAllSaleByUserId);

    const mockFetchAllSaleByUserIdService = {
        execute: vi.fn().mockRejectedValue(new Error('Service error')),
    };

    vi.spyOn(makeFetchAllSaleByUserIdServiceModule, 'makeFetchAllSaleByUserIdService').mockReturnValue(mockFetchAllSaleByUserIdService);

    const response = await app.inject({
        method: 'GET',
        url: '/sales/user-id',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json().message).toBe('Internal Server Error');
});
