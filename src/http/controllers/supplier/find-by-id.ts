import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindSupplierByIdService } from "../../../services/factories/supplier/make-find-supplier-by-id-service";

export async function findSupplierById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const findSupplierByIdService = makeFindSupplierByIdService();

        const { id } = request.params as { id: string };

        const { supplier } = await findSupplierByIdService.execute({
            supplierId: id
        });

        reply.code(200).send({
            supplier
        });
    } catch (error) {
        console.error(error); // Log do erro

        reply.code(500).send({
            error: 'Internal Server Error',
            message: 'An error occurred while fetching the supplier',
            statusCode: 500
        });
    }
}
