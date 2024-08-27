import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", {
    handler: async (
      _request: FastifyRequest,
      reply: FastifyReply
    ) => {
      reply.redirect("/api/users/");
    }
  });
};