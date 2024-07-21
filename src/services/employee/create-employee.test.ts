import { beforeEach, describe, expect, it } from "vitest"
import { hash } from "bcryptjs"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { InMemoryEmployeeRepository } from "../../repositories/in-memory/in-memory-employee-repository"
import { CreateEmployeeService } from "./create-employee"
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository"
import { randomUUID } from "crypto"

let employeesRepository : InMemoryEmployeeRepository
let usersRepository : InMemoryUsersRepository
let sut: CreateEmployeeService

describe('Create Employee service', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeeRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateEmployeeService(employeesRepository, usersRepository);
  });

  it('should be able to create an employee', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      role: 'EMPLOYEE',
      email: 'johndoeeee1@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { employee } = await sut.execute({
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password_hash
    });

    expect(employee.id).toEqual(expect.any(String));
  });
});