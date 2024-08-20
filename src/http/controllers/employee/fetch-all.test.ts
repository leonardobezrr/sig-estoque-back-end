import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { fetchAllEmployees } from './fetch-all';
import * as makeFetchAllEmployeesServiceModule from '../../../services/factories/employee/make-fetch-all-employees-service';
import { Employee } from '@prisma/client'; // Ajuste conforme necessário

test('should fetch all employees successfully', async () => {
  const app = fastify();

  app.get('/employees', fetchAllEmployees);

  const mockFetchAllEmployeesService = {
    execute: vi.fn().mockResolvedValue({
      employee: [
        { id: '1', name: 'Employee One', email: 'employee1@test.com' },
        { id: '2', name: 'Employee Two', email: 'employee2@test.com' },
      ],
    }),
  };

  vi.spyOn(makeFetchAllEmployeesServiceModule, 'makeFetchAllEmployeesService').mockReturnValue(mockFetchAllEmployeesService);

  const response = await app.inject({
    method: 'GET',
    url: '/employees',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    employee: [
      { id: '1', name: 'Employee One', email: 'employee1@test.com' },
      { id: '2', name: 'Employee Two', email: 'employee2@test.com' },
    ],
  });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.get('/employees', fetchAllEmployees);

  const mockFetchAllEmployeesService = {
    execute: vi.fn().mockRejectedValue(new Error('Some error')),
  };

  vi.spyOn(makeFetchAllEmployeesServiceModule, 'makeFetchAllEmployeesService').mockReturnValue(mockFetchAllEmployeesService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/employees',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ message: 'Internal Server Error' });
  } finally {
    // Restaurar console.error
    console.error = originalConsoleError;
  }
});
