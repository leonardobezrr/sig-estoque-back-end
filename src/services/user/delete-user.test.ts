import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { DeleteUserService } from "./delete-user";

let userRepository: InMemoryUsersRepository;
let sut: DeleteUserService;

describe('Delete User Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new DeleteUserService(userRepository);
  });

  it('should be able to delete a user by ID', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed_password',
      role: 'MANAGER',
    });

    const result = await sut.execute({ id: createdUser.id });
    const deletedUser = result.user;

    expect(deletedUser).toHaveProperty('id', createdUser.id);
    expect(deletedUser).toHaveProperty('name', 'John Doe');
  });

  it('should throw an error if the user does not exist', async () => {
    await expect(sut.execute({ id: 'non-existing-id' })).rejects.toThrow('User not found');
  });
});
