import { Manager } from "@prisma/client";
import { ManagerRepository } from "../../repositories/manager-repository";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcryptjs";
import { NoRecordsFoundError } from "../errors/no-records-found-error";

interface UpdateManagerServiceRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
}

interface UpdateManagerServiceResponse {
  manager: Manager;
}

export class UpdateManagerService {
  constructor(
    private managerRepository: ManagerRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: UpdateManagerServiceRequest): Promise<UpdateManagerServiceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NoRecordsFoundError();
    }

    if (password) {
      const hashedPassword = await hash(password, 6);
      await this.userRepository.update({
        id: user.id,
        name,
        email,
        role: "MANAGER",
        password_hash: hashedPassword,
      });
    } else {
      await this.userRepository.update({
        id: user.id,
        name,
        email,
        role: "MANAGER",
        password_hash: user.password_hash,
      });
    }

    const oldManager = await this.managerRepository.findByUserId(user.id);

    if (!oldManager) {
      throw new NoRecordsFoundError();
    }

    const updatedManager = await this.managerRepository.update({
      userId: user.id,
      id: oldManager.id
    });

    return {
      manager: updatedManager
    };
  }
}
