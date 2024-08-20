import { test, expect, vi } from 'vitest'; // Adicione a importação de 'vi'
import fastify from 'fastify';
import { createManager } from './create';
import * as makeCreateManagerServiceModule from '../../../services/factories/manager/make-create-manager-service';
import { UserAlreadyExistsError } from '../../../services/errors/user-already-exists-error';

test('should create a new manager successfully', async () => {
  const app = fastify();

  app.post('/managers', createManager);

  const mockCreateManagerService = {
    execute: vi.fn().mockResolvedValue({}),
  };

    vi.spyOn(makeCreateManagerServiceModule, 'makeCreateManagerService').mockReturnValue(mockCreateManagerService);


  const response = await app.inject({
    method: 'POST',
    url: '/managers',
    payload: {
      name: 'Test Manager',
      email: 'manager@test.com',
      password: 'password123',
    },
  });

  expect(response.statusCode).toBe(201);
});

test('should return 409 if the user already exists', async () => {
    const app = fastify();
  
    app.post('/managers', createManager);
  
    const mockCreateManagerService = {
      execute: vi.fn().mockRejectedValue(new UserAlreadyExistsError()),
    };
  
    vi.spyOn(makeCreateManagerServiceModule, 'makeCreateManagerService').mockReturnValue(mockCreateManagerService);
  
    const response = await app.inject({
      method: 'POST',
      url: '/managers',
      payload: {
        name: 'Test Manager',
        email: 'manager@test.com',
        password: 'password123',
      },
    });
  
    expect(response.statusCode).toBe(409);
    expect(response.json()).toEqual({ message: 'E-mail already exists.' });
  });
