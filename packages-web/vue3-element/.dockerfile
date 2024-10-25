from node:20 as base

WORKDIR /app

COPY package*.json ./

RUN npm install

from base as builder

COPY . .

RUN pnpm build

from builder as 