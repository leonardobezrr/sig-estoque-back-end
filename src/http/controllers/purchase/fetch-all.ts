import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllPurchaseService } from "../../../services/factories/purchase/make-fetch-all-purchase-service";

export async function fetchAllPurchase(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllPurchaseService = makeFetchAllPurchaseService();

    const { purchase } = await fetchAllPurchaseService.execute();

    reply.code(200).send({
        purchase
    });
}