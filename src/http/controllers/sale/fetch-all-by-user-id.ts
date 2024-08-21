import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllSaleByUserIdService } from "../../../services/factories/sale/make-fetch-all-sale-by-user-id";

export async function fetchAllSaleByUserId(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSaleByUserIdService = makeFetchAllSaleByUserIdService();

    const { userId } = request.params as { userId: string };

    try {
        const { sales } = await fetchAllSaleByUserIdService.execute({ userId });
        return reply.code(200).send({ sales });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return reply.code(500).send({ message: 'Internal Server Error' });
    }
}
