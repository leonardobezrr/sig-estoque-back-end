import fastify from "fastify"
import { protectedRoutes } from "./http/routes/routes"
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { publicRoutes } from "./http/routes/public-routes";

export const app = fastify()

app.addHook("preHandler", (req, res, done) => {
  // cabeçaçhos CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Methods", "PUT");
  res.header("Access-Control-Allow-Headers", "*");

  // Verifica se a requisição é uma pré-verificação (preflight)
  const isPreflight = req.method === "OPTIONS";
  if (isPreflight) {
    // Retorna uma resposta vazia para pré-verificação (preflight)
    return res.send();
  }

  done();
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(protectedRoutes);
app.register(publicRoutes);