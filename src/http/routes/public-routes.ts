import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/user/authenticate";
import { fetchAllUsers } from "../controllers/user/fetch-all";

export async function publicRoutes(app: FastifyInstance) {
  // auth
  app.post("/login", authenticateUser);
}