import { beforeEach, describe, it, expect } from "vitest";
import { CreateManagerService } from "./create-manager";
import { InMemoryManagersRepository } from "../../repositories/in-memory/in-memory-manager-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

let managerRepository: InMemoryManagersRepository;
let userRepository: InMemoryUsersRepository;
let sut: CreateManagerService;

describe('Create Manager Service', () => {
  beforeEach(() => {
    managerRepository = new InMemoryManagersRepository();
    userRepository = new InMemoryUsersRepository();
    sut = new CreateManagerService(managerRepository, userRepository);
  });

  it('should be able to create a new manager', async () => {
    const { manager } = await sut.execute({
      name: 'Manager 1',
      email: 'manager1@example.com',
      password: 'password123',
    });

    expect(manager.id).toEqual(expect.any(String));
  });

  it("should hash the manager password before saving", async () => {
    const password = "password123";

    const { manager } = await sut.execute({
      name: "Jane Doe",
      email: "jane@example.com",
      password,
    });

    const user = await userRepository.findByEmail("jane@example.com");

    expect(user?.password_hash).not.toBe(password);
    const isMatch = await compare(password, user!.password_hash);
    expect(isMatch).toBe(true);
  });

  it('should not allow creating a manager with an existing email', async () => {
    await sut.execute({
      name: 'Manager 1',
      email: 'manager1@example.com',
      password: 'password123',
    });

    await expect(() =>
      sut.execute({
        name: 'Manager 2',
        email: 'manager1@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(UserAlreadyExistsError);
  });
});
