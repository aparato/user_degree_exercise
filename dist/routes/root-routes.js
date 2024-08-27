"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(fastify) {
    fastify.get("/", {
        handler: async (_request, reply) => {
            reply.redirect("/api/users/");
        }
    });
}
;
