import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { createSale } from './create';
import * as makeCreateSaleServiceModule from '../../../services/factories/sale/make-create-sale-service';
import { z } from 'zod';

test('should create a new sale successfully', async () => {
  const app = fastify();

  app.post('/sales', createSale);

  const mockCreateSaleService = {
    handle: vi.fn().mockResolvedValue({}),
  };

  vi.spyOn(makeCreateSaleServiceModule, 'makeCreateSaleService').mockReturnValue(mockCreateSaleService);

  const response = await app.inject({
    method: 'POST',
    url: '/sales',
    payload: {
      nf_number: '123456',
      userId: 'user-id',
      items: [
        {
          productId: 'product-id',
          quantity: 2,
          value: 100.0,
        },
      ],
    },
  });

  expect(response.statusCode).toBe(201);
  expect(mockCreateSaleService.handle).toHaveBeenCalledWith({
    nf_number: '123456',
    userId: 'user-id',
    items: [
      {
        productId: 'product-id',
        quantity: 2,
        value: 100.0,
      },
    ],
  });
});

test('should return 400 if the request payload is invalid', async () => {
  const app = fastify();

  app.post('/sales', createSale);

  const response = await app.inject({
    method: 'POST',
    url: '/sales',
    payload: {
      nf_number: '123456',
      userId: 'user-id',
      items: [ // Missing required fields in items
        {
          productId: 'product-id',
          quantity: 'invalid-quantity', // Invalid type
        },
      ],
    },
  });

  expect(response.statusCode).toBe(400);
  expect(response.json().message).toBe('Invalid request payload');
});

test('should handle service errors', async () => {
  const app = fastify();

  app.post('/sales', createSale);

  const mockCreateSaleService = {
    handle: vi.fn().mockRejectedValue(new Error('Service error')),
  };

  vi.spyOn(makeCreateSaleServiceModule, 'makeCreateSaleService').mockReturnValue(mockCreateSaleService);

  const response = await app.inject({
    method: 'POST',
    url: '/sales',
    payload: {
      nf_number: '123456',
      userId: 'user-id',
      items: [
        {
          productId: 'product-id',
          quantity: 2,
          value: 100.0,
        },
      ],
    },
  });

  expect(response.statusCode).toBe(500);
  expect(response.json().message).toBe('Internal Server Error');
});
