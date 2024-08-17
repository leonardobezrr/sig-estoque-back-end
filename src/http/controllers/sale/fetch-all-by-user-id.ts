import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllSaleByUserIdService } from "../../../services/factories/sale/make-fetch-all-sale-by-user-id";

export async function fetchAllSaleByUserId(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSaleByUserIdService = makeFetchAllSaleByUserIdService();

    const { userId } = request.params as { userId: string };

    const { sales } = await fetchAllSaleByUserIdService.execute({
        userId
    });

    reply.code(200).send({
        sales
    });
}
