import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEmployeesRepository } from "../../repositories/in-memory/in-memory-employee-repository";
import { FetchAllEmployeeService } from "./fetch-all-employee";

let employeeRepository: InMemoryEmployeesRepository;
let sut: FetchAllEmployeeService;

describe('Fetch All Employee Service', () => {
    beforeEach(() => {
        employeeRepository = new InMemoryEmployeesRepository();
        sut = new FetchAllEmployeeService(employeeRepository);
    });

    it('should be able to fetch all employees', async () => {
        await employeeRepository.create({
            user: { connect: { id: 'user-1-id' } }
        });

        await employeeRepository.create({
            user: { connect: { id: 'user-2-id' } }
        });

        const result = await sut.execute();
        const employees = result.employee;

        expect(employees).toHaveLength(2);
        expect(employees[0]).toHaveProperty('userId', 'user-1-id');
        expect(employees[1]).toHaveProperty('userId', 'user-2-id');
    });
});