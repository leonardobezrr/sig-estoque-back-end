import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { createProduct } from './create';
import * as makeCreateProductServiceModule from '../../../services/factories/product/make-create-product-service';

test('should create a new product successfully', async () => {
  const app = fastify();

  app.post('/products', createProduct);

  const mockCreateProductService = {
    handle: vi.fn().mockResolvedValue({
      product: {
        id: '1',
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        supplierId: 'supplier1',
        quantity_in_stock: 100,
        batch: 'ABC123', // Mock batch code, pode variar na implementação real
      },
    }),
  };

  vi.spyOn(makeCreateProductServiceModule, 'makeCreateProductService').mockReturnValue(mockCreateProductService);

  const response = await app.inject({
    method: 'POST',
    url: '/products',
    payload: {
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      supplierId: 'supplier1',
      quantity_in_stock: 100,
    },
  });

  expect(response.statusCode).toBe(201);
  expect(response.json()).toEqual({
    product: {
      id: '1',
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      supplierId: 'supplier1',
      quantity_in_stock: 100,
      batch: 'ABC123',
    },
  });
});

test('should handle errors correctly', async () => {
  const app = fastify();

  app.post('/products', createProduct);

  const mockCreateProductService = {
    handle: vi.fn().mockRejectedValue(new Error('Simulated error for testing')),
  };

  vi.spyOn(makeCreateProductServiceModule, 'makeCreateProductService').mockReturnValue(mockCreateProductService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'POST',
      url: '/products',
      payload: {
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        supplierId: 'supplier1',
        quantity_in_stock: 100,
      },
    });

    // Verificar a resposta esperada para erro
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