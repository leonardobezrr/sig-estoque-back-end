import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryManagersRepository } from "../../repositories/in-memory/in-memory-manager-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { FetchAllManagerService } from "./fetch-all-manager";

let managerRepository: InMemoryManagersRepository;
let userRepository: InMemoryUsersRepository;
let sut: FetchAllManagerService;

describe('Fetch All Managers Service', () => {
  beforeEach(() => {
    managerRepository = new InMemoryManagersRepository();
    userRepository = new InMemoryUsersRepository();
    sut = new FetchAllManagerService(managerRepository);
  });

  it('should be able to fetch all managers', async () => {
    const user1 = await userRepository.create({
      name: 'Manager 1',
      email: 'manager1@example.com',
      password_hash: 'hashed-password-1',
      role: 'MANAGER'
    });

    const user2 = await userRepository.create({
      name: 'Manager 2',
      email: 'manager2@example.com',
      password_hash: 'hashed-password-2',
      role: 'MANAGER'
    });

    await managerRepository.create({
      user: { connect: { id: user1.id } }
    });

    await managerRepository.create({
      user: { connect: { id: user2.id } }
    });

    const result = await sut.execute();
    const managers = result.managers;

    expect(managers).toHaveLength(2);

    const manager1User = await userRepository.findById(managers[0].userId);
    const manager2User = await userRepository.findById(managers[1].userId);

    expect(manager1User).toHaveProperty('name', 'Manager 1');
    expect(manager2User).toHaveProperty('name', 'Manager 2');
  });
});
