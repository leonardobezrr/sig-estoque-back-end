import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { fetchAllProduct } from './fetch-all';
import * as makeFetchAllProductServiceModule from '../../../services/factories/product/make-fetch-all-product-service';

test('should fetch all products successfully', async () => {
  const app = fastify();

  app.get('/products', fetchAllProduct);

  const mockFetchAllProductService = {
    execute: vi.fn().mockResolvedValue({
      product: [
        { id: '1', name: 'Product One', description: 'Description for product one', price: 10.99, supplierId: 'supplier1', quantity_in_stock: 50, batch: 'BATCH01' },
        { id: '2', name: 'Product Two', description: 'Description for product two', price: 20.99, supplierId: 'supplier2', quantity_in_stock: 30, batch: 'BATCH02' },
      ],
    }),
  };

  vi.spyOn(makeFetchAllProductServiceModule, 'makeFetchAllProductService').mockReturnValue(mockFetchAllProductService);

  const response = await app.inject({
    method: 'GET',
    url: '/products',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    product: [
      { id: '1', name: 'Product One', description: 'Description for product one', price: 10.99, supplierId: 'supplier1', quantity_in_stock: 50, batch: 'BATCH01' },
      { id: '2', name: 'Product Two', description: 'Description for product two', price: 20.99, supplierId: 'supplier2', quantity_in_stock: 30, batch: 'BATCH02' },
    ],
  });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.get('/products', fetchAllProduct);

  const mockFetchAllProductService = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing')),
  };

  vi.spyOn(makeFetchAllProductServiceModule, 'makeFetchAllProductService').mockReturnValue(mockFetchAllProductService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/products',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
      message: 'Simulated error for testing',
      statusCode: 500,
    });
  } finally {
    // Restaurar console.error
    console.error = originalConsoleError;
  }
});
