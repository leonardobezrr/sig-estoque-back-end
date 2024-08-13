import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryManagersRepository } from "../../repositories/in-memory/in-memory-manager-repository";
import { FindManagerByUserId } from "./find-manager-by-user-id";

let managerRepository: InMemoryManagersRepository;
let sut: FindManagerByUserId;

describe('Find Manager By User ID Service', () => {
  beforeEach(() => {
    managerRepository = new InMemoryManagersRepository();
    sut = new FindManagerByUserId(managerRepository);
  });

  it('should be able to find a manager by user ID', async () => {
    const createdManager = await managerRepository.create({
      user: {
        connect: { id: 'user-1' }
      },
    });

    const result = await sut.execute({ userId: createdManager.userId });
    const manager = result.manager;

    expect(manager).toHaveProperty('id', createdManager.id);
    expect(manager).toHaveProperty('userId', 'user-1');
  });

  it('should return null if manager is not found', async () => {
    const result = await sut.execute({ userId: 'non-existing-user-id' });

    expect(result.manager).toBeNull();
  });
});
