import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/user/authenticate";
import { createManager } from "../controllers/manager/create";

export async function publicRoutes(app: FastifyInstance) {
  // auth
  app.post("/login", authenticateUser);
  app.post("/managerss", createManager);
}