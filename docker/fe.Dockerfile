FROM node:22-alpine AS base

FROM base AS builder 
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=fe --docker