import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user-service";

export default async function(fastify: FastifyInstance) {
  const userService = new UserService();

  // Preload data necessary for these routes
  userService.initialize();

  fastify.get("/", {
    handler: async (
      _request: FastifyRequest,
      reply: FastifyReply
    ) => {
      reply.send(userService.users);
    }
  });

  fastify.post("/create", {
    handler: async (
      request: FastifyRequest<{
        Body: {
          name: string,
          friends: number[]
        };
      }>,
      reply: FastifyReply
    ) => {
      const newUser = request.body;
      const user = userService.createUser(newUser);
      reply.send(user);
    }
  });

  fastify.patch("/update/:userId", {
    handler: async (
      request: FastifyRequest<{
        Params: {
          userId: string;
        };
        Body: {
          name: string;
          friends: number[];
        };
      }>,
      reply: FastifyReply
    ) => {
      const userId = request.params.userId;
      const userData = request.body;
      const user = userService.updateUser(parseInt(userId), userData);

      if(user) {
        reply.send(user);
      } else {
        reply.code(404).send(`No user with id ${userId} exists in system`);
      }
    }
  });

  fastify.get("/degrees/:userId/:friendId", {
    handler: async (
      request: FastifyRequest<{
        Params: {
          userId: string;
          friendId: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      const { userId, friendId } = request.params;
      const degrees = userService.findFriendshipDegree(parseInt(userId), parseInt(friendId));
      return degrees > 0 ? degrees : "No relationship found";
    }
  });
  
  fastify.delete("/delete/:userId", {
    handler: async (
      request: FastifyRequest<{
        Params: {
          userId: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      const userId = request.params.userId;
      const user = userService.deleteUser(parseInt(userId));
      reply.code(200).send(`User ${userId} successfully removed`);
    }
  });
};