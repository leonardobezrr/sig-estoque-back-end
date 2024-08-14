// find-manager-by-id.ts
import { Manager } from "@prisma/client";
import { ManagerRepository } from "../../repositories/manager-repository";
import { NoRecordsFoundError } from "../errors/no-records-found-error";  // Importa o erro

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
    // Busca o gerente pelo ID
    const manager = await this.managerRepository.findById(id);

    if (!manager) {
      throw new NoRecordsFoundError();  // Lança o erro se não encontrado
    }

    return { manager };
  }
}
