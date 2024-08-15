import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEmployeesRepository } from "../../repositories/in-memory/in-memory-employee-repository";
import { FindEmployeeByUserId } from "./find-employee-by-user-id";

let employeeRepository: InMemoryEmployeesRepository;
let sut: FindEmployeeByUserId;

describe('Find Employee by User ID Service', () => {
    beforeEach(() => {
        employeeRepository = new InMemoryEmployeesRepository();
        sut = new FindEmployeeByUserId(employeeRepository);
    });

    it('should be able to find an employee by User ID', async () => {
        await employeeRepository.create({
            user: { connect: { id: 'user-1-id' } }
        });

        const result = await sut.execute({ userId: 'user-1-id' });

        expect(result.employee).toHaveProperty('userId', 'user-1-id');
    });

    it('should return null if employee with User ID is not found', async () => {
        const result = await sut.execute({ userId: 'non-existent-user-id' });

        expect(result.employee).toBeNull();
    });
});