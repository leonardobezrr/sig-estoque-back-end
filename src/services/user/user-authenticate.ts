import { User } from "@prisma/client"
import { UserRepository } from "../../repositories/user-repository"
import { InvalidCredentialError } from "../errors/invalid-credential-error"
import { compare } from "bcryptjs";

interface UserAuthenticateServiceRequest {
  email: string
  password: string
}

interface UserAuthenticateServiceResponse {
  user: User
}

export class UserAuthenticateService {
  constructor(
      private userRepository: UserRepository
  ) {}

  async execute({ email, password }: UserAuthenticateServiceRequest): Promise<UserAuthenticateServiceResponse> {
      const user = await this.userRepository.findByEmail(email)

      if (!user) {
          throw new InvalidCredentialError()
      }

      const doesPasswordMatches = await compare(password, user.password_hash)

      if (!doesPasswordMatches) {
          throw new InvalidCredentialError()
      }

      return {
          user,
      }
  }
}