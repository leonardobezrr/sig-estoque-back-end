import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserByIdService } from "../../../services/factories/user/make-get-user-by-id";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";

export async function findUserByid(request: FastifyRequest, reply: FastifyReply) {
    const findUserByid = makeGetUserByIdService();
    const { id } = request.params as { id: string };

    try {
        const { user } = await findUserByid.execute({ userId: id });

        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        reply.code(200).send({ user });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        console.error(error);
        return reply.status(500).send({ message: "Internal Server Error" });
    }
}
