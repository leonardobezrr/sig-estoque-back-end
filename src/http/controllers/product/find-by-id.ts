import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindProductByIdService } from "../../../services/factories/product/make-find-product-by-id-service";

export async function findProductById(request: FastifyRequest, reply: FastifyReply) {
    const getProductByIdService = makeFindProductByIdService();

    const { id } = request.params as { id: string };

    const { product } = await getProductByIdService.execute({
        productId: id
    });

    reply.code(200).send({
        product
    });
}