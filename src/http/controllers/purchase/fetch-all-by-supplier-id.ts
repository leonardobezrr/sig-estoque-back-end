import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllPurchaseBySupplierIdService } from "../../../services/factories/purchase/make-fetch-all-purchase-by-supplier-id";

export async function fetchAllPurchaseBySupplierId(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllPurchaseBySupplierIdService = makeFetchAllPurchaseBySupplierIdService();

    const { supplierId } = request.params as { supplierId: string };

    const { purchases } = await fetchAllPurchaseBySupplierIdService.execute({
        supplierId
    });

    reply.code(200).send({
        purchases
    });
}
