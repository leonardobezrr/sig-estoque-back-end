import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindProductByIdService } from "../../../services/factories/product/make-find-product-by-id-service";
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error";

export async function findProductById(request: FastifyRequest, reply: FastifyReply) {
    const findProductByIdSchema = z.object({
        id: z.string(),
    });

    try {
        const { id } = findProductByIdSchema.parse(request.params);

        const findProductByIdService = makeFindProductByIdService();
        
        const { product } = await findProductByIdService.execute({ productId: id });

        return reply.status(200).send({ product });
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: 'No records found.' });
        }

        throw error;
    }
}
