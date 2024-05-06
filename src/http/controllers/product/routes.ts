import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findById } from "./find-by-id";
import { findMany } from "./find-all";
import { patch } from "./patch";
import { inactivate } from "./inactivate";

export async function productsRoutes(app: FastifyInstance) {
    app.post("/products", create);
    app.get("/products", findMany);
    app.get("/products/:id", findById);
    app.patch("/products/:id", patch);
    app.delete("/products/:id", inactivate);
}