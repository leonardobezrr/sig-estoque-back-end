import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchManySupplierByCompanyNameService } from "../../../services/factories/supplier/make-fetch-many-by-company-name";

export async function fetchManyByCompanyName(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchManyByCompanyNameService = makeFetchManySupplierByCompanyNameService();
        const { companyName } = request.params as { companyName: string };
        const { supplier } = await fetchManyByCompanyNameService.execute({
            companyName: companyName
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
