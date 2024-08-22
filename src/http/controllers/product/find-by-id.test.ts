import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { findProductById } from './find-by-id';
import * as makeFindProductByIdServiceModule from '../../../services/factories/product/make-find-product-by-id-service';
import { NoRecordsFoundError } from '../../../services/errors/no-records-found-error';

test('should find a product by id successfully', async () => {
  const app = fastify();

  app.get('/products/:id', findProductById);

  const mockFindProductByIdService = {
    execute: vi.fn().mockResolvedValue({
      product: {
        id: '1',
        name: 'Product One',
        description: 'Description for product one',
        price: 10.99,
        supplierId: 'supplier1',
        quantity_in_stock: 50,
        batch: 'BATCH01'
      },
    }),
  };

  vi.spyOn(makeFindProductByIdServiceModule, 'makeFindProductByIdService').mockReturnValue(mockFindProductByIdService);

  const response = await app.inject({
    method: 'GET',
    url: '/products/1',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    product: {
      id: '1',
      name: 'Product One',
      description: 'Description for product one',
      price: 10.99,
      supplierId: 'supplier1',
      quantity_in_stock: 50,
      batch: 'BATCH01'
    },
  });
});

test('should return 404 if the product is not found', async () => {
  const app = fastify();

  app.get('/products/:id', findProductById);

  const mockFindProductByIdService = {
    execute: vi.fn().mockRejectedValue(new NoRecordsFoundError()),
  };

  vi.spyOn(makeFindProductByIdServiceModule, 'makeFindProductByIdService').mockReturnValue(mockFindProductByIdService);

  const response = await app.inject({
    method: 'GET',
    url: '/products/999',
  });

  expect(response.statusCode).toBe(404);
  expect(response.json()).toEqual({ message: 'No records found.' });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.get('/products/:id', findProductById);

  const mockFindProductByIdService = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated internal error')),
  };

  vi.spyOn(makeFindProductByIdServiceModule, 'makeFindProductByIdService').mockReturnValue(mockFindProductByIdService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/products/1',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
      message: 'Simulated internal error',
      statusCode: 500,
    });
  } finally {
    // Restaurar console.error
    console.error = originalConsoleError;
  }
});
