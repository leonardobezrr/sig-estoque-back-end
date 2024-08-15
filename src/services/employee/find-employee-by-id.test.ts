import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEmployeesRepository } from "../../repositories/in-memory/in-memory-employee-repository";
import { FindEmployeeByIdService } from "./find-employee-by-id";

let employeeRepository: InMemoryEmployeesRepository;
let sut: FindEmployeeByIdService;

describe('Find Employee by ID Service', () => {
    beforeEach(() => {
        employeeRepository = new InMemoryEmployeesRepository();
        sut = new FindEmployeeByIdService(employeeRepository);
    });

    it('should be able to find an employee by ID', async () => {
        const createdEmployee = await employeeRepository.create({
            user: { connect: { id: 'user-1-id' } }
        });

        const result = await sut.execute({ id: createdEmployee.id });

        expect(result.employee).toHaveProperty('userId', 'user-1-id');
    });

    it('should return null if employee is not found', async () => {
        const result = await sut.execute({ id: 'non-existent-id' });

        expect(result.employee).toBeNull();
    });
});
