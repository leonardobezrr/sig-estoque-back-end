import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePatchProductService } from "../../../services/factories/product/make-patch-product-service";

export async function patch(request: FastifyRequest, reply: FastifyReply) {
    const patchProdutctBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        quantity_in_stock: z.number().optional(),
        batch: z.string().optional(),
    });

    const { id } = request.params as { id: string };

    const { name, description, price, quantity_in_stock, batch } = patchProdutctBodySchema.parse(request.body);

    const patchProductService = makePatchProductService();

    const { product } = await patchProductService.handle({
        id,
        data: {
            name,
            description,
            price,
            quantity_in_stock,
            batch,
        },
    });

    reply.code(200).send({
        product,
    });
}