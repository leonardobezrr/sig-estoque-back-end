import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { findEmployeeById } from './find-by-id';
import * as makeFindEmployeeByIdServiceModule from '../../../services/factories/employee/make-find-employee-by-id-service';
import { NoRecordsFoundError } from '../../../services/errors/no-records-found-error';

test('should find employee by ID successfully', async () => {
  const app = fastify();

  app.get('/employees/:id', findEmployeeById);

  const mockFindEmployeeByIdService = {
    execute: vi.fn().mockResolvedValue({
      employee: { id: '1', name: 'Employee One', email: 'employee1@test.com' },
    }),
  };

  vi.spyOn(makeFindEmployeeByIdServiceModule, 'makeFindEmployeeByIdService').mockReturnValue(mockFindEmployeeByIdService);

  const response = await app.inject({
    method: 'GET',
    url: '/employees/1',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    employee: { id: '1', name: 'Employee One', email: 'employee1@test.com' },
  });
});

test('should return 404 if no employee is found', async () => {
  const app = fastify();

  app.get('/employees/:id', findEmployeeById);

  const mockFindEmployeeByIdService = {
    execute: vi.fn().mockRejectedValue(new NoRecordsFoundError()),
  };

  vi.spyOn(makeFindEmployeeByIdServiceModule, 'makeFindEmployeeByIdService').mockReturnValue(mockFindEmployeeByIdService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/employees/999', // ID que não existe
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ message: 'No records found.' });
  } finally {
    // Restaurar console.error
    console.error = originalConsoleError;
  }
});
