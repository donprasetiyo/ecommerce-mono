FROM node:18-alpine AS base
ARG APP_NAME=""
ARG PORT=""
ARG KAFKA_SSL_SECRETS_DIR=""

RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN npm install -g turbo

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=${APP_NAME} --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
RUN ls -lh
COPY --from=builder /app/${KAFKA_SSL_SECRETS_DIR} .
RUN ls -lh
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm dlx turbo run build --filter=${APP_NAME}

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/${APP_NAME}/next.config.js .
COPY --from=installer /app/apps/${APP_NAME}/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/${APP_NAME}/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

COPY --from=installer --chown=nextjs:nodejs /app/packages/database/prisma ./packages/database/prisma
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/migrateandstart.sh ./

RUN chmod +x /app/migrateandstart.sh

# Create and set permissions for /pnpm
USER root
RUN mkdir -p /pnpm && chown -R nextjs:nodejs /pnpm

# Install dotenv as nextjs user
USER nextjs
RUN pnpm install -g dotenv dotenv-cli prisma kysely prisma-kysely

ENV NODE_ENV production

EXPOSE ${PORT}

ENV PORT ${PORT}

CMD ["./migrateandstart.sh"]