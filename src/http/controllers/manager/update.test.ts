import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { updateManager } from './update';
import * as makeUpdateManagerServiceModule from '../../../services/factories/manager/make-update-manager-service';

test('should update manager successfully', async () => {
  const app = fastify();

  app.put('/managers/:id', updateManager);

  const mockUpdateManagerService = {
    execute: vi.fn().mockResolvedValue({}),
  };

  vi.spyOn(makeUpdateManagerServiceModule, 'makeUpdateManagerService').mockReturnValue(mockUpdateManagerService);

  const response = await app.inject({
    method: 'PUT',
    url: '/managers/1',
    payload: {
      userId: 'user1',
      name: 'Updated Manager',
      email: 'updatedmanager@test.com',
      password: 'newpassword123',
    },
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({ message: 'Manager successfully updated.' });
});

test('should return a custom error message for testing', async () => {
  const app = fastify();

  app.put('/managers/:id', updateManager);

  const mockUpdateManagerService = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing')),
  };

  vi.spyOn(makeUpdateManagerServiceModule, 'makeUpdateManagerService').mockReturnValue(mockUpdateManagerService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'PUT',
      url: '/managers/1',
      payload: {
        userId: 'user1',
        name: 'Updated Manager',
        email: 'updatedmanager@test.com',
        password: 'newpassword123',
      },
    });

    // Verificar a resposta esperada para erro
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ message: 'Internal Server Error' });
  } finally {
    // Restaurar console.error
    console.error = originalConsoleError;
  }
});
