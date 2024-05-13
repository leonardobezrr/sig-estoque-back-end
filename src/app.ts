import fastify from "fastify"
import { protectedRoutes } from "./http/routes/routes"

export const app = fastify()

app.register(protectedRoutes)