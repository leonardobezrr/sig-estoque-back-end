import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetUserProfileServiceRequest {
  userId: string;
}

interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(
      private userRepository: UserRepository
  ) {}

  async execute({ userId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
      const user = await this.userRepository.findById(userId)

      if (!user) {
          throw new ResourceNotFoundError()
      }

      return {
          user
      }
  }
}