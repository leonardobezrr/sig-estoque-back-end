import { Manager } from "@prisma/client";
import { hash } from "bcryptjs";
import { ManagerRepository } from "../../repositories/manager-repository";
import { UserRepository } from "../../repositories/user-repository";
import { isEmail } from 'validator';  // Importação da biblioteca validator

interface CreateManagerServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateManagerServiceResponse {
  manager: Manager;
}

export class CreateManagerService {
  constructor(
    private managerRepository: ManagerRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateManagerServiceRequest): Promise<CreateManagerServiceResponse> {
    // Validação de dados
    if (!name || !email || !password) {
      throw new Error('Invalid data provided');
    }

    if (!isEmail(email)) {
      throw new Error('Invalid data provided');
    }

    if (password.length < 6) { // Ajuste conforme a política de senha
      throw new Error('Invalid data provided');
    }

    // Verificar se o email já está em uso
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("Email already exists.");
    }

    // Criptografar a senha
    const password_hash = await hash(password, 10); // Uso de 10 como custo padrão

    // Definir o papel do usuário
    const userRole = "MANAGER";

    // Criar o usuário
    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      role: userRole,
    });

    // Criar o manager
    const manager = await this.managerRepository.create({
      user: { connect: { id: user.id } },
    });

    return {
      manager,
    };
  }
}
