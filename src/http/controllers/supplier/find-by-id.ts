import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindSupplierByIdService } from "../../../services/factories/supplier/make-find-supplier-by-id-service";

export async function findSupplierById(request: FastifyRequest, reply: FastifyReply) {
    const findSupplierByIdService = makeFindSupplierByIdService();

    const { id } = request.params as { id: string };

    const { supplier } = await findSupplierByIdService.execute({
        supplierId: id
    });

    reply.code(200).send({
        supplier
    });
}