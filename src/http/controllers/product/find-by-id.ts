import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProductByIdService } from "../../../services/factories/make-get-product-by-id-service";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
    const getProductByIdService = makeGetProductByIdService();

    const { id } = request.params as { id: string };

    const { product } = await getProductByIdService.execute({
        productId: id
    });

    reply.code(200).send({
        product
    });
}