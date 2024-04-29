import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function productsRoutes(app: FastifyInstance) {
    app.post("/products", create);
}