import { Manager } from "@prisma/client"
import { ManagerRepository } from "../../repositories/manager-repository"

interface FindManagerByUserIdRequest {
  userId: string
}

interface FindManagerByUserIdResponse {
  manager: Manager | null
}

export class FindManagerByUserId {
  constructor(
    private managerRepository: ManagerRepository,
  ) { }

  async execute({
    userId
  }: FindManagerByUserIdRequest): Promise<FindManagerByUserIdResponse> {

    const manager = await this.managerRepository.findByUserId(userId)

    return {
      manager
    }
  }
}