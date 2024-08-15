import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryManagersRepository } from "../../repositories/in-memory/in-memory-manager-repository";
import { FindManagerByIdService } from "./find-manager-by-id";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

let managerRepository: InMemoryManagersRepository;
let sut: FindManagerByIdService;

describe('Find Manager By Id Service', () => {
    beforeEach(() => {
        managerRepository = new InMemoryManagersRepository();
        sut = new FindManagerByIdService(managerRepository);
    });

    it('should be able to find a manager by ID', async () => {
        const createdManager = await managerRepository.create({
            user: {
                connect: { id: 'user-1' }
            }
        });

        const result = await sut.execute({ id: createdManager.id });
        const manager = result.manager;

        expect(manager).toHaveProperty('id', createdManager.id);
        expect(manager).toHaveProperty('userId', 'user-1');
    });

    it('should throw NoRecordsFoundError if manager is not found', async () => {
        await expect(() => 
            sut.execute({ id: 'non-existing-id' })
        ).rejects.toThrow(NoRecordsFoundError);
    });
});
