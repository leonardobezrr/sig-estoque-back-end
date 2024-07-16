import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllSupplierService } from "../../../services/factories/supplier/make-fetch-all-supplier-service";

export async function fetchAllSupplier(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSupplierService = makeFetchAllSupplierService();

    const { supplier } = await fetchAllSupplierService.execute();

    reply.code(200).send({
        supplier
    });
}