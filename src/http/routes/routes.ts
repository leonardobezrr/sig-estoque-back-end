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
import { fetchAllSupplier } from "../controllers/supplier/fetch-all";
import { fetchManyByCompanyName } from "../controllers/supplier/fetch-many-by-company-name";
import { fetchManyBySocialName } from "../controllers/supplier/fetch-many-by-social-name";
import { findSupplierById } from "../controllers/supplier/find-by-id";
import { patchSupplier } from "../controllers/supplier/patch";
import { fetchAllUsers } from "../controllers/user/fetch-all";
import { deleteUser } from "../controllers/user/delete";
import { findUserByid } from "../controllers/user/find-by-id";
import { createSale } from "../controllers/sale/create";
import { fetchAllSale } from "../controllers/sale/fetch-all";
import { findSaleById } from "../controllers/sale/find-by-id";
import { createPurchase } from "../controllers/purchase/create";
import { fetchAllPurchase } from "../controllers/purchase/fetch-all";
import { findPurchaseById } from "../controllers/purchase/find-by-id";
import { fetchAllSaleByUserId } from "../controllers/sale/fetch-all-by-user-id";
import { fetchAllPurchaseByUserId } from "../controllers/purchase/fetch-all-by-user-id";
import { fetchAllPurchaseBySupplierId } from "../controllers/purchase/fetch-all-by-supplier-id";

export async function protectedRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    // users
    app.get("/user/:id", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, findUserByid);
    app.get("/profile", { onRequest: [verifyUserRole(["MANAGER"])] }, profile);
    app.get("/users", { onRequest: [verifyUserRole(["MANAGER"])] }, fetchAllUsers);
    app.delete("/delete/:id", { onRequest: [verifyUserRole(["MANAGER"])] }, deleteUser);

    // products
    app.post("/products", { onRequest: [verifyUserRole(["EMPLOYEE"])] }, createProduct);
    app.get("/products", { onRequest: [verifyUserRole(["EMPLOYEE"])] }, fetchAllProduct);
    app.get("/products/:id", { onRequest: [verifyUserRole(["EMPLOYEE"])] }, findProductById);
    app.patch("/products/:id", { onRequest: [verifyUserRole(["EMPLOYEE"])] }, patchProduct);
    app.delete("/products/:id", { onRequest: [verifyUserRole(["EMPLOYEE"])] }, inactivateProduct);

    // managers
    app.post("/managers", { onRequest: [verifyUserRole(["MANAGER"])] }, createManager);
    app.get("/managers", { onRequest: [verifyUserRole(["MANAGER"])] }, fetchAllManagers);
    app.get("/manager/:id", { onRequest: [verifyUserRole(["MANAGER"])] }, findManagerById);
    app.put("/manager/update/:id", { onRequest: [verifyUserRole(["MANAGER"])] }, updateManager);

    // employees
    app.post("/employees", { onRequest: [verifyUserRole(["MANAGER"])] }, createEmployee);
    app.get("/employees", { onRequest: [verifyUserRole(["MANAGER"])] }, fetchAllEmployees);
    app.get("/employee/:id", { onRequest: [verifyUserRole(["MANAGER"])] }, findEmployeeById);
    app.put("/employee/update/:id", { onRequest: [verifyUserRole(["MANAGER"])] }, updateEmployee);

    // suppliers
    app.post("/suppliers", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, createSupplier);
    app.get("/suppliers", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchAllSupplier);
    app.get("/suppliers/:id", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, findSupplierById);
    app.get("/suppliers/company-name/:companyName", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchManyByCompanyName);
    app.get("/suppliers/social-name/:socialName", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchManyBySocialName);
    app.patch("/suppliers/:id", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, patchSupplier);

    // sales
    app.post("/sales", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, createSale);
    app.get("/sales", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchAllSale);
    app.get("/sales/:id", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, findSaleById);
    app.get("/sales/user/:userId", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchAllSaleByUserId);

    // purchases
    app.post("/purchases", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, createPurchase);
    app.get("/purchases", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchAllPurchase);
    app.get("/purchases/:id", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, findPurchaseById);
    app.get("/purchases/user/:userId", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchAllPurchaseByUserId);
    app.get("/purchases/supplier/:supplierId", { onRequest: [verifyUserRole(["MANAGER", "EMPLOYEE"])] }, fetchAllPurchaseBySupplierId);
}