import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findById } from "./find-by-id";
import { findMany } from "./find-all";

export async function productsRoutes(app: FastifyInstance) {
    app.post("/products", create);
    app.get("/products", findMany);
    app.get("/products/:id", findById);
}