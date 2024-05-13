import fastify from "fastify"
import { productsRoutes } from "./http/controllers/product/routes"

export const app = fastify()

app.register(productsRoutes)