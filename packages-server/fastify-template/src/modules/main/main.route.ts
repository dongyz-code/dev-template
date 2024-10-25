import type { FastifyPluginCallback } from 'fastify';

const mainRoute: FastifyPluginCallback = async (app) => {
  app.get('/main', async (request, reply) => {
    const { headers, body } = request;
    return { message: 'Hello World' };
  });
};

export default mainRoute;
