import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { inactivateProduct } from './inactivate';
import * as makeInactivateProductServiceModule from '../../../services/factories/product/make-inactivate-product-service';
import { NoRecordsFoundError } from '../../../services/errors/no-records-found-error';

test('should inactivate a product successfully', async () => {
  const app = fastify();

  app.delete('/products/:id', inactivateProduct);

  const mockInactivateProductService = {
    execute: vi.fn().mockResolvedValue(undefined),
  };

  vi.spyOn(makeInactivateProductServiceModule, 'makeInactivateProductService').mockReturnValue(mockInactivateProductService);

  const response = await app.inject({
    method: 'DELETE',
    url: '/products/123',
  });

  expect(response.statusCode).toBe(204);
  expect(response.body).toBe('');

  expect(mockInactivateProductService.execute).toHaveBeenCalledWith({
    productId: '123',
  });
});

test('should return 404 if the product is not found', async () => {
  const app = fastify();

  app.delete('/products/:id', inactivateProduct);

  const mockInactivateProductService = {
    execute: vi.fn().mockRejectedValue(new NoRecordsFoundError()),
  };

  vi.spyOn(makeInactivateProductServiceModule, 'makeInactivateProductService').mockReturnValue(mockInactivateProductService);

  const response = await app.inject({
    method: 'DELETE',
    url: '/products/999',
  });

  expect(response.statusCode).toBe(404);
  expect(response.json()).toEqual({ message: 'No records found.' });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.delete('/products/:id', inactivateProduct);

  const mockInactivateProductService = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated internal error')),
  };

  vi.spyOn(makeInactivateProductServiceModule, 'makeInactivateProductService').mockReturnValue(mockInactivateProductService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'DELETE',
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
