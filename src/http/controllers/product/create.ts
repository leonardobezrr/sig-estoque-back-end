import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateProductService } from "../../../services/factories/product/make-create-product-service";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createProdutctBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
    });

    const { name, description, price } = createProdutctBodySchema.parse(request.body);

    const CreateProductService = makeCreateProductService();

    const { product } = await CreateProductService.handle({
        name,
        description,
        price,
        quantity_in_stock: 0,
        batch: "default"
    });

    reply.code(201).send({
        product
    });
}