import { FastifyInstance } from "fastify";
import { createProduct } from "../controllers/product/create";
import { findProductById } from "../controllers/product/find-by-id";
import { findManyProduct } from "../controllers/product/find-all";
import { patchProduct } from "../controllers/product/patch";
import { inactivateProduct } from "../controllers/product/inactivate";
import { createManager } from "../controllers/manager/create";

export async function protectedRoutes(app: FastifyInstance) {
    // products
    app.post("/products", createProduct);
    app.get("/products", findManyProduct);
    app.get("/products/:id", findProductById);
    app.patch("/products/:id", patchProduct);
    app.delete("/products/:id", inactivateProduct);

    // managers
    app.post("/managers", createManager);
}