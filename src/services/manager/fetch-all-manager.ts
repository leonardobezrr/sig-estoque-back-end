import { Manager } from "@prisma/client";
import { ManagerRepository } from "../../repositories/manager-repository";

interface FetchAllManagerServiceResponse {
  managers: Manager[];
}

export class FetchAllManagerService {
  constructor(private managerRepository: ManagerRepository) {}

  async execute(): Promise<FetchAllManagerServiceResponse> {
    const managers = await this.managerRepository.findMany();

    return {
      managers
    };
  }
}