import { config } from 'dotenv';

config();

function getEnv() {
  const { SERVER_PORT, DATABASE_URL, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN, ...rest } = process.env;
  return {
    SERVER_PORT: Number(SERVER_PORT) || 8000,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV || 'dev',
    ...rest,
  };
}

export const Env = getEnv();
