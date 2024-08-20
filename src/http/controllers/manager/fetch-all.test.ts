import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { fetchAllManagers } from './fetch-all';
import * as makeFetchAllManagersServiceModule from '../../../services/factories/manager/make-fetch-all-managers-serive';
import { Manager } from '@prisma/client'; // Ajuste o import conforme necessário

test('should fetch all managers successfully', async () => {
  const app = fastify();

  app.get('/managers', fetchAllManagers);

  const mockFetchAllManagersService = {
    execute: vi.fn().mockResolvedValue({
      managers: [
        { id: '1', userId: 'user1', name: 'Manager One', email: 'manager1@test.com' },
        { id: '2', userId: 'user2', name: 'Manager Two', email: 'manager2@test.com' },
      ],
    }),
  };

  vi.spyOn(makeFetchAllManagersServiceModule, 'makeFetchAllManagersService').mockReturnValue(mockFetchAllManagersService);

  const response = await app.inject({
    method: 'GET',
    url: '/managers',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    managers: [
      { id: '1', userId: 'user1', name: 'Manager One', email: 'manager1@test.com' },
      { id: '2', userId: 'user2', name: 'Manager Two', email: 'manager2@test.com' },
    ],
  });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.get('/managers', fetchAllManagers);

  const mockFetchAllManagersService = {
    execute: vi.fn().mockRejectedValue(new Error('Some error')),
  };

  vi.spyOn(makeFetchAllManagersServiceModule, 'makeFetchAllManagersService').mockReturnValue(mockFetchAllManagersService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/managers',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ message: 'Internal Server Error' });
  } finally {
    // Restaurar console.error
    console.error = originalConsoleError;
  }
});
