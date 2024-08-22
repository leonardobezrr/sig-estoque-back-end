import { test, expect, vi } from 'vitest';
import fastify from 'fastify';
import { updateEmployee } from './update';
import * as makeUpdateEmployeeServiceModule from '../../../services/factories/employee/make-update-employee-service';

test('should update employee successfully', async () => {
  const app = fastify();

  app.put('/employees/:id', updateEmployee);

  const mockUpdateEmployeeService = {
    execute: vi.fn().mockResolvedValue({}),
  };

  vi.spyOn(makeUpdateEmployeeServiceModule, 'makeUpdateEmployeeService').mockReturnValue(mockUpdateEmployeeService);

  const response = await app.inject({
    method: 'PUT',
    url: '/employees/1',
    payload: {
      userId: 'user1',
      name: 'Updated Employee',
      email: 'updatedemployee@test.com',
      password: 'newpassword123',
    },
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({ message: 'Employee successfully updated.' });
});

test('should return 500 if there is an internal server error', async () => {
  const app = fastify();

  app.put('/employees/:id', updateEmployee);

  const mockUpdateEmployeeService = {
    execute: vi.fn().mockRejectedValue(new Error('Simulated error for testing')),
  };

  vi.spyOn(makeUpdateEmployeeServiceModule, 'makeUpdateEmployeeService').mockReturnValue(mockUpdateEmployeeService);

  // Redirecionar console.error para ignorar erros
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const response = await app.inject({
      method: 'PUT',
      url: '/employees/1',
      payload: {
        userId: 'user1',
        name: 'Updated Employee',
        email: 'updatedemployee@test.com',
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
