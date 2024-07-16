import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllProductService } from "../../../services/factories/product/make-fetch-all-product-service";

export async function fetchAllProduct(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllProductService = makeFetchAllProductService();

    const { product } = await fetchAllProductService.execute();

    reply.code(200).send({
        product
    });
}