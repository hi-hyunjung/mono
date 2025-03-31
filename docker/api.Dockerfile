FROM node:22-alpine AS base

FROM base AS builder 
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm install -w source-map-support

COPY --from=builder /app/out/full .
COPY turbo.json ./
COPY .git/ ./.git/

ARG TURBO_TOKEN
ENV TURBO_TOKEN=${TURBO_TOKEN}


RUN pnpm dlx turbo run build --filter=api...

FROM base as RUNNER
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system -G nodejs --uid 1001 nestjs
USER nestjs

COPY --from=installer --chown=nestjs:nodejs /app .
CMD node -r source-map-support/register projects/api/dist/main.js