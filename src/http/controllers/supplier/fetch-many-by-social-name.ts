import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchManySupplierBySocialNameService } from "../../../services/factories/supplier/make-fetch-many-by-social-name";

export async function fetchManyBySocialName(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchManyBySocialNameService = makeFetchManySupplierBySocialNameService();

        const { socialName } = request.params as { socialName: string };

        const { supplier } = await fetchManyBySocialNameService.execute({
            socialName: socialName
        });

        reply.code(200).send({
            supplier
        });
    } catch (error) {
        console.error(error); // Log do erro

        reply.code(500).send({
            error: 'Internal Server Error',
            message: 'An error occurred while fetching suppliers',
            statusCode: 500
        });
    }
}
