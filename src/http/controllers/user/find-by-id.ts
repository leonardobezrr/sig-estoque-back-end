import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserByIdService } from "../../../services/factories/user/make-get-user-by-id";

export async function findUserByid(request: FastifyRequest, reply: FastifyReply) {
    const findUserByid = makeGetUserByIdService();

    const { id } = request.params as { id: string };

    const { user } = await findUserByid.execute({
        userId: id
    });

    reply.code(200).send({
        user
    });
}