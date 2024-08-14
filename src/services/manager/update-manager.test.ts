import { beforeEach, describe, expect, it } from "vitest";
import { hash, compare } from "bcryptjs";
import { InMemoryManagersRepository } from "../../repositories/in-memory/in-memory-manager-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { UpdateManagerService } from "./update-manager";
import { NoRecordsFoundError } from "../errors/no-records-found-error";  // Importa o erro

let managersRepository: InMemoryManagersRepository;
let usersRepository: InMemoryUsersRepository;
let updateManagerService: UpdateManagerService;

describe("Update Manager Service", () => {
  beforeEach(() => {
    managersRepository = new InMemoryManagersRepository();
    usersRepository = new InMemoryUsersRepository();
    updateManagerService = new UpdateManagerService(managersRepository, usersRepository);
  });

  it("should be able to update a manager's information", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      role: "MANAGER",
      password_hash: await hash("oldpassword", 6),
    });

    const manager = await managersRepository.create({
      user: { connect: { id: user.id } },
    });

    const updatedManager = await updateManagerService.execute({
      userId: user.id,
      name: "John Updated",
      email: "johnupdated@example.com",
      password: "newpassword",
    });

    expect(updatedManager.manager).toEqual(expect.objectContaining({
      id: manager.id,
      userId: user.id,
    }));

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser!.name).toBe("John Updated");
    expect(updatedUser!.email).toBe("johnupdated@example.com");

    const isPasswordCorrect = await compare("newpassword", updatedUser!.password_hash);
    expect(isPasswordCorrect).toBe(true);
  });

  it("should be able to update manager's information without changing the password", async () => {
    const user = await usersRepository.create({
      name: "Jane Doe",
      email: "janedoe@example.com",
      role: "MANAGER",
      password_hash: await hash("janespassword", 6),
    });

    const manager = await managersRepository.create({
      user: { connect: { id: user.id } },
    });

    const updatedManager = await updateManagerService.execute({
      userId: user.id,
      name: "Jane Updated",
      email: "janeupdated@example.com",
    });

    expect(updatedManager.manager).toEqual(expect.objectContaining({
      id: manager.id,
      userId: user.id,
    }));

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser!.name).toBe("Jane Updated");
    expect(updatedUser!.email).toBe("janeupdated@example.com");

    // Verifique se a senha não foi alterada
    const isPasswordCorrect = await compare("janespassword", updatedUser!.password_hash);
    expect(isPasswordCorrect).toBe(true);
  });

  it("should throw NoRecordsFoundError if user is not found", async () => {
    await expect(() =>
      updateManagerService.execute({
        userId: 'non-existing-user-id',
        name: 'Some Name',
        email: 'someemail@example.com',
      })
    ).rejects.toThrow(NoRecordsFoundError);
  });

  it("should throw NoRecordsFoundError if manager is not found", async () => {
    const user = await usersRepository.create({
      name: "Manager",
      email: "manager@example.com",
      role: "MANAGER",
      password_hash: await hash("password", 6),
    });

    await expect(() =>
      updateManagerService.execute({
        userId: user.id,
        name: 'Updated Name',
        email: 'updated@example.com',
      })
    ).rejects.toThrow(NoRecordsFoundError);
  });
});
