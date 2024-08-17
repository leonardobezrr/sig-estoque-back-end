import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindSaleByIdService } from "../../../services/factories/sale/make-find-sale-by-id-service";

export async function findSaleById(request: FastifyRequest, reply: FastifyReply) {
    const findSaleByIdService = makeFindSaleByIdService();

    const { id } = request.params as { id: string };

    const { sale } = await findSaleByIdService.execute({
        saleId: id
    });

    reply.code(200).send({
        sale
    });
}