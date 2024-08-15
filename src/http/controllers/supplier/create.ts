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
}