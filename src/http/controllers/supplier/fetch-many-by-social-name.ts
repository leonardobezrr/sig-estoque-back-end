import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchManySupplierBySocialNameService } from "../../../services/factories/supplier/make-fetch-many-by-social-name";

export async function fetchManyBySocialName(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyBySocialNameService = makeFetchManySupplierBySocialNameService();

    const { socialName } = request.params as { socialName: string };

    const { supplier } = await fetchManyBySocialNameService.execute({
        socialName: socialName
    });

    reply.code(200).send({
        supplier
    });
}