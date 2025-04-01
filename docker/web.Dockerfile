FROM node:22-alpine AS base

FROM base AS builder 
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer

RUN apk add --no-cache libc6-compat
RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app

RUN npm install -g node-gyp corepack@latest
RUN corepack enable

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json ./
COPY .turbo/ ./.turbo
COPY .git/ ./.git/

ARG TURBO_TOKEN
ENV TURBO_TOKEN=${TURBO_TOKEN}

COPY --from=builder /app/projects/web/.env.build /app/projects/web/.env.production
RUN SKIP_ENV_VALIDATION=true pnpm dlx turbo run build --filter=web...

FROM base AS runner
WORKDIR /app

RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow
RUN groupmod -g 1001 node && usermod -u 1001 node

RUN addgroup --system --gid 3000 nodejs
RUN adduser --system -G nodejs --uid 1000 nextjs -D 
USER nextjs

COPY --from=installer /app/projects/web/next.config.ts .
COPY --from=installer /app/projects/web/package.json .
COPY --from=installer /app/projects/web/.env.production ./projects/web/.env.production

COPY --from=installer --chown=nextjs:nodejs /app/projects/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/projects/web/.next/static ./projects/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/projects/web/public ./projects/web/public
COPY --from=installer --chown=nextjs:nodejs /app/projects/web/entrypoint.sh ./projects/web/entrypoint.sh

ENTRYPOINT [ "projects/web/entrypoint.sh" ]

CMD node projects/web/server.js