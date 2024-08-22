import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { patchProduct } from './patch';
import * as makePatchProductServiceModule from '../../../services/factories/product/make-patch-product-service';
import { NoRecordsFoundError } from '../../../services/errors/no-records-found-error';

test('should patch a product successfully', async () => {
  const app = fastify();

  app.patch('/products/:id', patchProduct);

  const mockPatchProductService = {
    handle: vi.fn().mockResolvedValue({
      product: {
        id: '1',
        name: 'Updated Product Name',
        description: 'Updated Description',
        price: 20.99,
        supplierId: 'supplier1',
        quantity_in_stock: 100,
        batch: 'BATCH01'
      },
    }),
  };

  vi.spyOn(makePatchProductServiceModule, 'makePatchProductService').mockReturnValue(mockPatchProductService);

  const response = await app.inject({
    method: 'PATCH',
    url: '/products/1',
    payload: {
      name: 'Updated Product Name',
      description: 'Updated Description',
      price: 20.99,
      quantity_in_stock: 100,
      batch: 'BATCH01',
    },
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    product: {
      id: '1',
      name: 'Updated Product Name',
      description: 'Updated Description',
      price: 20.99,
      supplierId: 'supplier1',
      quantity_in_stock: 100,
      batch: 'BATCH01',
    },
  });
});

test('should return 404 if the product is not found', async () => {
  const app = fastify();

  app.patch('/products/:id', patchProduct);

  const mockPatchProductService = {
    handle: vi.fn().mockRejectedValue(new NoRecordsFoundError()),
  };

  vi.spyOn(makePatchProductServiceModule, 'makePatchProductService').mockReturnValue(mockPatchProductService);

  const response = await app.inject({
    method: 'PATCH',
    url: '/products/999',
    payload: {
      name: 'Updated Product Name',
      description: 'Updated Description',
      price: 20.99,
      quantity_in_stock: 100,
      batch: 'BATCH01',
    },
  });

  expect(response.statusCode).toBe(404);
  expect(response.json()).toEqual({ message: 'No records found.' });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.patch('/products/:id', patchProduct);

  const mockPatchProductService = {
    handle: vi.fn().mockRejectedValue(new Error('Simulated internal error')),
  };

  vi.spyOn(makePatchProductServiceModule, 'makePatchProductService').mockReturnValue(mockPatchProductService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'PATCH',
      url: '/products/1',
      payload: {
        name: 'Updated Product Name',
        description: 'Updated Description',
        price: 20.99,
        quantity_in_stock: 100,
        batch: 'BATCH01',
      },
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
