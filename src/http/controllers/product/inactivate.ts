import { FastifyRequest, FastifyReply } from "fastify";
import { makeInactivateProductService } from "../../../services/factories/product/make-inactivate-product-service";
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error";

export async function inactivateProduct(request: FastifyRequest, reply: FastifyReply) {
    const inactivateProductService = makeInactivateProductService();

    const { id } = request.params as { id: string };

    try {
        await inactivateProductService.execute({
            productId: id
        });

        return reply.code(204).send();
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: 'No records found.' });
        }

        throw error;
    }
}
