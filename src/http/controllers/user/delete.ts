import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteUserService } from "../../../services/factories/user/make-delete-user-service";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const deleteUserSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = deleteUserSchema.parse(request.params)

        const deleteUserService = makeDeleteUserService()

        await deleteUserService.execute({ id })

        return reply.status(200).send({ message: "User successfully deleted." });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}