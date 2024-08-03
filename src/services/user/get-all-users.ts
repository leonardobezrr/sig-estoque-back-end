import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";

interface GetAllUsersServiceResponse {
  users: User[];
}

export class GetAllUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetAllUsersServiceResponse> {
    const users = await this.userRepository.findMany();

    return {
      users
    };
  }
}