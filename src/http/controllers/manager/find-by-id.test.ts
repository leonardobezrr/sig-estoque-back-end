import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { findManagerById } from './find-by-id';
import * as makeFindManagerByIdServiceModule from '../../../services/factories/manager/make-find-manager-by-id-service';
import { NoRecordsFoundError } from '../../../services/errors/no-records-found-error';

test('should return a manager by ID successfully', async () => {
  const app = fastify();

  app.get('/managers/:id', findManagerById);

  const mockFindManagerByIdService = {
    execute: vi.fn().mockResolvedValue({
      manager: {
        id: '1',
        name: 'Manager One',
        email: 'manager1@test.com',
      },
    }),
  };

  vi.spyOn(makeFindManagerByIdServiceModule, 'makeFindManagerByIdService').mockReturnValue(mockFindManagerByIdService);

  const response = await app.inject({
    method: 'GET',
    url: '/managers/1',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    manager: {
      id: '1',
      name: 'Manager One',
      email: 'manager1@test.com',
    },
  });
});

test('should return 404 if no manager is found', async () => {
  const app = fastify();

  app.get('/managers/:id', findManagerById);

  const mockFindManagerByIdService = {
    execute: vi.fn().mockRejectedValue(new NoRecordsFoundError()),
  };

  vi.spyOn(makeFindManagerByIdServiceModule, 'makeFindManagerByIdService').mockReturnValue(mockFindManagerByIdService);

  const response = await app.inject({
    method: 'GET',
    url: '/managers/1',
  });

  expect(response.statusCode).toBe(404);
  expect(response.json()).toEqual({ message: 'No records found.' });
});
