import { FastifyInstance } from "fastify";
import { createProduct } from "../controllers/product/create";
import { findProductById } from "../controllers/product/find-by-id";
import { fetchAllProduct } from "../controllers/product/fetch-all";
import { patchProduct } from "../controllers/product/patch";
import { inactivateProduct } from "../controllers/product/inactivate";
import { createManager } from "../controllers/manager/create";
import { profile } from "../controllers/user/get-user-profile";
import { verifyJWT } from "../middlewares/jwt-verify";
import { verifyUserRole } from "../middlewares/verify-user-role";
import { fetchAllManagers } from "../controllers/manager/fetch-all";
import { findManagerById } from "../controllers/manager/find-by-id";
import { updateManager } from "../controllers/manager/update";
import { createEmployee } from "../controllers/employee/create";
import { fetchAllEmployees } from "../controllers/employee/fetch-all";
import { findEmployeeById } from "../controllers/employee/find-by-id";
import { updateEmployee } from "../controllers/employee/update";
import { createSupplier } from "../controllers/supplier/create";

export async function protectedRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    // users
    app.get("/profile", profile);

    // products
    app.post("/products", createProduct);
    app.get("/products", fetchAllProduct);
    app.get("/products/:id", findProductById);
    app.patch("/products/:id", patchProduct);
    app.delete("/products/:id", inactivateProduct);

    // managers
    app.post("/managers", { onRequest: [verifyUserRole("MANAGER")] }, createManager);
    app.get("/managers", { onRequest: [verifyUserRole("MANAGER")] }, fetchAllManagers);
    app.get("/manager/:id", { onRequest: [verifyUserRole("MANAGER")] }, findManagerById);
    app.put("/manager/update/:id", { onRequest: [verifyUserRole("MANAGER")] }, updateManager);

    // employees
    app.post("/employees", { onRequest: [verifyUserRole("MANAGER")] }, createEmployee);
    app.get("/employees", { onRequest: [verifyUserRole("MANAGER")] }, fetchAllEmployees);
    app.get("/employee/:id", { onRequest: [verifyUserRole("MANAGER")] }, findEmployeeById);
    app.put("/employee/update/:id", { onRequest: [verifyUserRole("MANAGER")] }, updateEmployee);

    // suppliers
    app.post("/suppliers", { onRequest: [verifyUserRole("MANAGER")] }, createSupplier);
}