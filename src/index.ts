import Fastify from "fastify";
import userRoutes from "./routes/user-routes";
import rootRoutes from "./routes/root-routes";

const fastify = Fastify({
  logger: true
});

fastify.register(rootRoutes);
fastify.register(userRoutes, { prefix: "/api/users" });

async function main() {
  await fastify.listen({
    port: 3000,
    host: '0.0.0.0'
  });
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  })
})

main();
