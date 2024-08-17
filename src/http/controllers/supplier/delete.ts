import { FastifyRequest, FastifyReply } from "fastify"
import { makeDeleteSupplierService } from "../../../services/factories/supplier/make-delete-supplier-service";

export async function deleteSupplier(request: FastifyRequest, reply: FastifyReply) {
    const deleteSupplierService = makeDeleteSupplierService();

    const { id } = request.params as { id: string };

    await deleteSupplierService.execute({
        id: id
    });

    reply.code(204).send();
}