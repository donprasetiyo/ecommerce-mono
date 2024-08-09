FROM node:18-alpine AS base
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
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm dlx turbo run build --filter=api

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api

# COPY --from=installer /app/apps/api/next.config.js .
COPY --from=installer /app/apps/api/package.json .

# Automatically leverage output traces to reduce image size
# https://api.org/api/advanced-features/output-file-tracing
# COPY --from=installer --chown=api:nodejs /app/apps/api/.next/standalone ./
# COPY --from=installer --chown=api:nodejs /app/apps/api/.next/static ./apps/api/.next/static
# COPY --from=installer --chown=api:nodejs /app/apps/api/public ./apps/api/public

COPY --from=installer --chown=api:nodejs /app/packages/database/prisma ./packages/database/prisma
# COPY --from=installer --chown=api:nodejs /app/apps/api/migrateandstart.sh ./apps/api

# RUN chmod +x /app/apps/api/migrateandstart.sh

# Create and set permissions for /pnpm
USER root
RUN mkdir -p /pnpm && chown -R api:nodejs /pnpm

# Install dotenv as api user
USER api
RUN pnpm install -g dotenv dotenv-cli prisma kysely prisma-kysely

ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node apps/api/dist/index.js

# CMD ["./apps/api/migrateandstart.sh"]