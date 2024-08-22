import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateProductService } from "../../../services/factories/product/make-create-product-service";

export async function createProduct(request: FastifyRequest, reply: FastifyReply) {
    const createProdutctBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        quantity_in_stock: z.number(),
    });

    const { name, description, price, quantity_in_stock } = createProdutctBodySchema.parse(request.body);

    const CreateProductService = makeCreateProductService();

    const batch = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { product } = await CreateProductService.handle({
        name,
        description,
        price,
        quantity_in_stock,
        batch: batch
    });

    reply.code(201).send({
        product
    });
}