FROM node:18-alpine AS base
ARG APP_NAME=""
ARG PORT=""

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
RUN turbo prune --scope=web --docker

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
RUN pnpm dlx turbo run build --filter=web

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/web/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

COPY --from=installer --chown=nextjs:nodejs /app/packages/database/prisma ./packages/database/prisma
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/migrateandstart.sh ./apps/web

RUN chmod +x /app/apps/web/migrateandstart.sh

# Create and set permissions for /pnpm
USER root
RUN mkdir -p /pnpm && chown -R nextjs:nodejs /pnpm

# Install dotenv as nextjs user
USER nextjs
RUN pnpm install -g dotenv dotenv-cli prisma kysely prisma-kysely

ENV NODE_ENV production

EXPOSE ${PORT}

ENV PORT ${PORT}

RUN ls -lh
RUN cd apps
RUN ls -lh
RUN cd web
RUN ls -lh
RUN cd ..
RUN cd ..

CMD HOSTNAME="0.0.0.0" node apps/web/server.js

# CMD ["./apps/web/migrateandstart.sh"]