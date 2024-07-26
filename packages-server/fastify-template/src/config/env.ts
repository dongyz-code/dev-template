import { config } from "dotenv";

config();

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 8000;

export const NODE_ENV = process.env.NODE_ENV || "dev";
