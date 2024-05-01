import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProductByIdService } from "../../../services/factories/make-get-product-by-id-service";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
    const getProductByIdService = makeGetProductByIdService();

    const { product } = await getProductByIdService.execute({
        productId: (request.params as Record<string, string>).id
    });

    reply.code(200).send({
        product
    });
}