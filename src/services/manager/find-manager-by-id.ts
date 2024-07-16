import { Manager } from "@prisma/client";
import { ManagerRepository } from "../../repositories/manager-repository";

interface FindManagerByIdServiceRequest {
  id: string;
}

interface FindManagerByIdServiceResponse {
  manager: Manager | null;
}

export class FindManagerByIdService {
  constructor(private managerRepository: ManagerRepository) {}

  async execute({
    id,
  }: FindManagerByIdServiceRequest): Promise<FindManagerByIdServiceResponse> {
    const manager = await this.managerRepository.findById(id)

    return {
      manager
    };
  }
}