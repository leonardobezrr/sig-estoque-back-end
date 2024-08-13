import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { GetUserByIdService } from "./get-user-by-id";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let userRepository: InMemoryUsersRepository;
let sut: GetUserByIdService;

describe('Get User By ID Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserByIdService(userRepository);
  });

  it('should return the user when the user exists', async () => {
    // Cria um usuário no repositório
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed_password',
      role: 'EMPLOYEE', // Ajuste o valor conforme o seu enum ROLE
    });

    // Executa o serviço para obter o usuário pelo ID
    const result = await sut.execute({ userId: createdUser.id });
    const user = result.user;

    // Verifica se o usuário retornado é o mesmo que foi criado
    expect(user).toHaveProperty('id', createdUser.id);
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'johndoe@example.com');
    expect(user).toHaveProperty('role', 'EMPLOYEE');
  });

  it('should throw a ResourceNotFoundError when the user does not exist', async () => {
    // Tenta obter um usuário que não existe
    await expect(sut.execute({ userId: 'non-existing-id' })).rejects.toThrow(ResourceNotFoundError);
  });
});
