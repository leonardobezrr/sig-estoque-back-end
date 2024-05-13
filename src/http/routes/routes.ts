import { FastifyInstance } from "fastify";
import { create } from "../controllers/product/create";
import { findById } from "../controllers/product/find-by-id";
import { findMany } from "../controllers/product/find-all";
import { patch } from "../controllers/product/patch";
import { inactivate } from "../controllers/product/inactivate";

export async function protectedRoutes(app: FastifyInstance) {
    // products
    app.post("/products", create);
    app.get("/products", findMany);
    app.get("/products/:id", findById);
    app.patch("/products/:id", patch);
    app.delete("/products/:id", inactivate);
}