import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindSaleByIdService } from "../../../services/factories/sale/make-find-sale-by-id-service";

export async function findSaleById(request: FastifyRequest, reply: FastifyReply) {
    const findSaleByIdService = makeFindSaleByIdService();

    const { id } = request.params as { id: string };

    try {
        const { sale } = await findSaleByIdService.execute({ saleId: id });

        if (!sale) {
            return reply.code(404).send({ message: 'Sale not found' });
        }

        reply.code(200).send({ sale });
    } catch (error) {
        console.error('Error fetching sale by ID:', error); // Log para depuração
        return reply.code(500).send({ message: 'Internal Server Error' });
    }
}
