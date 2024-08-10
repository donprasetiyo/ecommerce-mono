#!/bin/sh

# DATABASE_URL="$1" pnpm -C packages/database prisma db push
HOSTNAME="0.0.0.0" node apps/web/server.js