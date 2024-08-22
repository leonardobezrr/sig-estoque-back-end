import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateSaleService } from "../../../services/factories/sale/make-create-sale-service";

export async function createSale(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createSaleSchema = z.object({
        nf_number: z.string(),
        userId: z.string(),
        items: z.array(
            z.object({
                productId: z.string(),
                quantity: z.number(),
                value: z.number(),
            })
        )
    });

    try {
        const { nf_number, userId, items } = createSaleSchema.parse(request.body);

        const createSaleService = makeCreateSaleService();

        await createSaleService.handle({
            nf_number,
            userId,
            items
        });

        return reply.status(201).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Invalid request payload' });
        }
        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
