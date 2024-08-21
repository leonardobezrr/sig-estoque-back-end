import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllSaleService } from "../../../services/factories/sale/make-fetch-all-sale-service";

export async function fetchAllSale(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSaleService = makeFetchAllSaleService();

    try {
        const { sale } = await fetchAllSaleService.execute();
        console.log('Fetched sales:', sale); // Log para depuração
        return reply.code(200).send({ sale });
    } catch (error) {
        console.error('Error fetching sales:', error); // Log para depuração
        return reply.code(500).send({ message: 'Internal Server Error' });
    }
}
