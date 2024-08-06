import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetUserByIdServiceRequest {
  userId: string;
}

interface GetUserByIdServiceResponse {
  user: User
}

export class GetUserByIdService {
  constructor(
      private userRepository: UserRepository
  ) {}

  async execute({ userId }: GetUserByIdServiceRequest): Promise<GetUserByIdServiceResponse> {
      const user = await this.userRepository.findById(userId)

      if (!user) {
          throw new ResourceNotFoundError()
      }

      return {
          user
      }
  }
}