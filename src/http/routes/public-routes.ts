import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/user/authenticate";

export async function publicRoutes(app: FastifyInstance) {
  // auth
  app.post("/login", authenticateUser);
}