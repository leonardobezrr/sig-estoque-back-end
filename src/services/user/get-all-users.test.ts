import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { GetAllUsersService } from "./get-all-users";

let userRepository: InMemoryUsersRepository;
let sut: GetAllUsersService;

describe('Get All Users Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetAllUsersService(userRepository);
  });

  it('should return all users', async () => {
    // Cria alguns usuários no repositório
    const user1 = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed_password',
      role: 'EMPLOYEE',
    });

    const user2 = await userRepository.create({
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password_hash: 'hashed_password',
      role: 'MANAGER',
    });

    // Executa o serviço para obter todos os usuários
    const result = await sut.execute();
    const users = result.users;

    // Verifica se o número correto de usuários foi retornado
    expect(users).toHaveLength(2);

    // Verifica se os usuários retornados são os mesmos que foram criados
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: user1.id,
          name: 'John Doe',
          email: 'johndoe@example.com',
        }),
        expect.objectContaining({
          id: user2.id,
          name: 'Jane Smith',
          email: 'janesmith@example.com',
        }),
      ])
    );
  });
});
