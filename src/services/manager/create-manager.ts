import { Manager } from "@prisma/client";
import { hash } from "bcryptjs";
import { ManagerRepository } from "../../repositories/manager-repository";
import { UserRepository } from "../../repositories/user-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

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
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 10);

    const userRole = "MANAGER";

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      role: userRole,
    });

    const manager = await this.managerRepository.create({
      user: { connect: { id: user.id } },
    });

    return {
      manager,
    };
  }
}
