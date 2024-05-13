import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProductByIdService } from "../../../services/factories/product/make-get-product-by-id-service";

export async function findProductById(request: FastifyRequest, reply: FastifyReply) {
    const getProductByIdService = makeGetProductByIdService();

    const { id } = request.params as { id: string };

    const { product } = await getProductByIdService.execute({
        productId: id
    });

    reply.code(200).send({
        product
    });
}