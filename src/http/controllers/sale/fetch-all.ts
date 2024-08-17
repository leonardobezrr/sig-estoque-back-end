import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllSaleService } from "../../../services/factories/sale/make-fetch-all-sale-service";

export async function fetchAllSale(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSaleService = makeFetchAllSaleService();

    const { sale } = await fetchAllSaleService.execute();

    reply.code(200).send({
        sale
    });
}