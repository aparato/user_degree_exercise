"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const user_service_1 = require("../services/user-service");
async function default_1(fastify) {
    const userService = new user_service_1.UserService();
    // Preload data necessary for these routes
    userService.initialize();
    fastify.get("/", {
        handler: async (_request, reply) => {
            reply.send(userService.users);
        }
    });
    fastify.post("/create", {
        handler: async (request, reply) => {
            const newUser = request.body;
            const user = userService.createUser(newUser);
            reply.send(user);
        }
    });
    fastify.patch("/update/:userId", {
        handler: async (request, reply) => {
            const userId = request.params.userId;
            const userData = request.body;
            const user = userService.updateUser(parseInt(userId), userData);
            if (user) {
                reply.send(user);
            }
            else {
                reply.code(404).send(`No user with id ${userId} exists in system`);
            }
        }
    });
    fastify.get("/degrees/:userId/:friendId", {
        handler: async (request, reply) => {
            const { userId, friendId } = request.params;
            const degrees = userService.findFriendshipDegree(parseInt(userId), parseInt(friendId));
            return degrees > 0 ? degrees : "No relationship found";
        }
    });
    fastify.delete("/delete/:userId", {
        handler: async (request, reply) => {
            const userId = request.params.userId;
            const user = userService.deleteUser(parseInt(userId));
            reply.code(200).send(`User ${userId} successfully removed`);
        }
    });
}
;
