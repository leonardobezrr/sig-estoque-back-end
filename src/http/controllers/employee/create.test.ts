import { test, expect, vi } from 'vitest'; // Importa o 'vi' para criar mocks
import fastify from 'fastify';
import { createEmployee } from './create';
import * as makeCreateEmployeeServiceModule from '../../../services/factories/employee/make-create-employee-service';
import { UserAlreadyExistsError } from '../../../services/errors/user-already-exists-error';

test('should create a new employee successfully', async () => {
  const app = fastify();

  app.post('/employees', createEmployee);

  const mockCreateEmployeeService = {
    execute: vi.fn().mockResolvedValue({}),
  };

  vi.spyOn(makeCreateEmployeeServiceModule, 'makeCreateEmployeeService').mockReturnValue(mockCreateEmployeeService);

  const response = await app.inject({
    method: 'POST',
    url: '/employees',
    payload: {
      name: 'Test Employee',
      email: 'employee@test.com',
      password: 'password123',
    },
  });

  expect(response.statusCode).toBe(201);
  expect(response.body).toBe('');
});

test('should return 409 if the employee already exists', async () => {
  const app = fastify();

  app.post('/employees', createEmployee);

  const mockCreateEmployeeService = {
    execute: vi.fn().mockRejectedValue(new UserAlreadyExistsError()),
  };

  vi.spyOn(makeCreateEmployeeServiceModule, 'makeCreateEmployeeService').mockReturnValue(mockCreateEmployeeService);

  const response = await app.inject({
    method: 'POST',
    url: '/employees',
    payload: {
      name: 'Test Employee',
      email: 'employee@test.com',
      password: 'password123',
    },
  });

  expect(response.statusCode).toBe(409);
  expect(response.json()).toEqual({ message: 'E-mail already exists.' });
});
