import type { FastifyPluginCallback } from 'fastify';

const userRoute: FastifyPluginCallback = async (app) => {
  app.get('users', async (request, reply) => {
    return { message: 'Hello World' };
  });
};

export default userRoute;
