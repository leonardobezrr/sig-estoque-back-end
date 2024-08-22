import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePurchaseService } from "../../../services/factories/purchase/make-create-purchase-service";

export async function createPurchase(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createPurchaseSchema = z.object({
        nf_number: z.string(),
        supplierId: z.string(),
        userId: z.string(),
        items: z.array(
            z.object({
                productId: z.string(),
                quantity: z.number(),
                value: z.number(),
            })
        )
    });

    const { nf_number, supplierId, userId, items } = createPurchaseSchema.parse(request.body);

    try {
        const createPurchaseService = makeCreatePurchaseService();

        await createPurchaseService.handle({
            nf_number,
            supplierId,
            userId,
            items
        })
    } catch (error) {
        throw error;
    }

    return reply.status(201).send();
}