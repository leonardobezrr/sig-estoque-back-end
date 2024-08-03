import { UserRepository } from "../../repositories/user-repository";
import { User } from "@prisma/client";

interface DeleteUserServiceRequest {
  id: string;
}

interface DeleteUserServiceResponse {
  user: User;
}

export class DeleteUserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute({ id }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const user = await this.userRepository.delete(id);

    return {
      user,
    };
  }
}
