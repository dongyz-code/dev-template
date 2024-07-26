import Fastify from 'fastify';
import { SERVER_PORT } from '@/config';
import { fastifyLogger } from '@/plugins/logger';

const app = Fastify({
  logger: fastifyLogger,
});

app.listen({ port: SERVER_PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
