import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEmployeesRepository } from "../../repositories/in-memory/in-memory-employee-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { CreateEmployeeService } from "./create-employee";

let employeeRepository: InMemoryEmployeesRepository;
let userRepository: InMemoryUsersRepository;
let sut: CreateEmployeeService;

describe('Create Employee Service', () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeesRepository();
    userRepository = new InMemoryUsersRepository();
    sut = new CreateEmployeeService(employeeRepository, userRepository);
  });

  it('should be able to create a new employee', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    const employee = result.employee;

    expect(employee).toHaveProperty('id');
    expect(employee).toHaveProperty('userId');
  });

  it('should not allow creating a new employee with an existing email', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashedpassword',
      role: 'EMPLOYEE',
    });

    await expect(sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })).rejects.toThrow('Email already exists.');
  });
});
