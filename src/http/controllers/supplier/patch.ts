import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePatchSupplierService } from "../../../services/factories/supplier/make-patch-supplier-service";
import { validateCNPJ, validatePhoneNumber } from "../../../utils/validators";

export async function patchSupplier(request: FastifyRequest, reply: FastifyReply) {
    const patchSupplierBodySchema = z.object({
        social_name: z.string().optional(),
        company_name: z.string().optional(),
        phone_number: z.string().refine(validatePhoneNumber, { message: 'Número de telefone inválido' }).optional(),
        cnpj: z.string().refine(validateCNPJ, { message: 'CNPJ inválido' }).optional()
    });

    const { id } = request.params as { id: string };

    const { social_name, company_name, phone_number, cnpj } = patchSupplierBodySchema.parse(request.body);

    const patchSupplierService = makePatchSupplierService();

    const { supplier } = await patchSupplierService.handle({
        id,
        data: {
            social_name,
            company_name,
            phone_number,
            cnpj,
        },
    });

    reply.code(200).send({
        supplier,
    });
}