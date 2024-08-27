"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const root_routes_1 = __importDefault(require("./routes/root-routes"));
const fastify = (0, fastify_1.default)({
    logger: true
});
fastify.register(root_routes_1.default);
fastify.register(user_routes_1.default, { prefix: "/api/users" });
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
    });
});
main();
