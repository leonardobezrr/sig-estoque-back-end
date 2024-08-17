import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindPurchaseByIdService } from "../../../services/factories/purchase/make-find-purchase-by-id-service";

export async function findPurchaseById(request: FastifyRequest, reply: FastifyReply) {
    const findPurchaseByIdService = makeFindPurchaseByIdService();

    const { id } = request.params as { id: string };

    const { purchase } = await findPurchaseByIdService.execute({
        purchaseId: id
    });

    reply.code(200).send({
        purchase
    });
}