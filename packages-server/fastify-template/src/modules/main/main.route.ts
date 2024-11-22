import type { FastifyPluginCallback } from 'fastify';

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  __token: {
    user_id: string;
  };
}

const mainRoute: FastifyPluginCallback = async (app) => {
  app.post<{
    Body: { a: number };
    Querystring: IQuerystring;
    Headers: IHeaders;
  }>('/main', async (request, reply) => {
    const {
      query,
      headers: {
        accept,
        __token: { user_id },
      },
      body,
    } = request;
    return { message: 'Hello World' };
  });
};

export default mainRoute;
