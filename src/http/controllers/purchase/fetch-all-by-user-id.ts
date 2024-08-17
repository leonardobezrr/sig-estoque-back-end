import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllPurchaseByUserIdService } from "../../../services/factories/purchase/make-fetch-all-purchase-by-user-id";

export async function fetchAllPurchaseByUserId(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllPurchaseByUserIdService = makeFetchAllPurchaseByUserIdService();

    const { userId } = request.params as { userId: string };

    const { purchases } = await fetchAllPurchaseByUserIdService.execute({
        userId
    });

    reply.code(200).send({
        purchases
    });
}
