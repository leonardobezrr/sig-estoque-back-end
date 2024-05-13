import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProductsDataService } from "../../../services/factories/product/make-get-products-data-service";

export async function findMany(request: FastifyRequest, reply: FastifyReply) {
    const getProductsDataService = makeGetProductsDataService();

    const { product } = await getProductsDataService.execute();

    reply.code(200).send({
        product
    });
}