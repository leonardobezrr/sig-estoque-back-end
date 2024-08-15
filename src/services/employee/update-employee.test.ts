import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryEmployeesRepository } from "../../repositories/in-memory/in-memory-employee-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { UpdateEmployeeService } from "./update-employee";
import { hash } from "bcryptjs";

let employeeRepository: InMemoryEmployeesRepository;
let userRepository: InMemoryUsersRepository;
let sut: UpdateEmployeeService;

describe("Update Employee Service", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeesRepository();
    userRepository = new InMemoryUsersRepository();
    sut = new UpdateEmployeeService(employeeRepository, userRepository);
  });

  it("should be able to update an employee", async () => {
    const user = await userRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "EMPLOYEE",
      password_hash: await hash("123456", 6),
    });

    const employee = await employeeRepository.create({
      user: { connect: { id: user.id } },
    });

    const updatedEmployee = await sut.execute({
      userId: user.id,
      name: "John Updated",
      email: "john.updated@example.com",
      password: "newpassword123",
    });

    const updatedUser = await userRepository.findById(user.id);

    expect(updatedUser).toHaveProperty("name", "John Updated");
    expect(updatedUser).toHaveProperty("email", "john.updated@example.com");

    expect(updatedEmployee).not.toBeNull();
    expect(updatedEmployee.employee).not.toBeNull();

    expect(updatedEmployee.employee).toHaveProperty("id", employee.id);
    expect(updatedEmployee.employee).toHaveProperty("userId", user.id);
  });

  it("should throw an error if user is not found", async () => {
    await expect(
      sut.execute({
        userId: "non-existent-user-id",
        name: "John Doe",
        email: "john.doe@example.com",
      })
    ).rejects.toThrow("User not found.");
  });

  it("should throw an error if updating employee fails", async () => {
    const user = await userRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "EMPLOYEE",
      password_hash: await hash("123456", 6),
    });

    await employeeRepository.create({
      user: { connect: { id: user.id } },
    });

    vi.spyOn(employeeRepository, "update").mockImplementationOnce(() => {
      throw new Error("Update failed");
    });

    await expect(
      sut.execute({
        userId: user.id,
        name: "John Updated",
        email: "john.updated@example.com",
        password: "newpassword123",
      })
    ).rejects.toThrow("Error updating employee: Error: Update failed");
  });
});