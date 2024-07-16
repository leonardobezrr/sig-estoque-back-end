import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeUserAuthenticateService } from "../../../services/factories/user/make-user-authenticate-service"
import { InvalidCredentialError } from "../../../services/errors/invalid-credential-error"

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
  })

  const { email, password } = authenticateUserBodySchema.parse(request.body)

  try {

      const authenticateUserService = makeUserAuthenticateService()

      const { user } = await authenticateUserService.execute({
          email,
          password
      })

      const token = await reply.jwtSign(
          {
              role: user.role
          },
          {
          sign: {
              sub: user.id
          }
      })

      return reply.status(200).send({
        id: user.id,
        role: user.role,
        token
      })

  } catch (error) {
      if (error instanceof InvalidCredentialError) {
          return reply.status(400).send({ message: error.message })
      }

      throw error
  }
}