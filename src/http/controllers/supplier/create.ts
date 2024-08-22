import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateSupplierService } from "../../../services/factories/supplier/make-create-supplier-service";

export async function createSupplier(request: FastifyRequest, reply: FastifyReply) {
    const createSupplierBodySchema = z.object({
        social_name: z.string(),
        company_name: z.string(),
        phone_number: z.string(),
        cnpj: z.string(),
    });

    try {
        const { social_name, company_name, phone_number, cnpj } = createSupplierBodySchema.parse(request.body);

        const CreateSupplierService = makeCreateSupplierService();

        const { supplier } = await CreateSupplierService.handle({
            social_name,
            company_name,
            phone_number,
            cnpj
        });

        reply.code(201).send({
            supplier
        });
    } catch (error) {
        console.error(error); // Log do erro

        // Se o erro for uma instância de ZodError, retorne um status 400
        if (error instanceof z.ZodError) {
            reply.code(400).send({ message: 'Invalid request data' });
        } else {
            // Em outros casos, retorne um status 500
            reply.code(500).send({ message: 'Internal Server Error' });
        }
    }
}
