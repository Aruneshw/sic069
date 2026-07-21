#!/bin/sh
set -eu

DB_DIR="${DB_DIR:-/app/prisma}"
DB_FILE="${DB_FILE:-$DB_DIR/dev.db}"
SEED_DB="${SEED_DB:-/app/prisma/seed.db}"

mkdir -p "$DB_DIR"

# If using a volume mount at /data, prefer that path when DATABASE_URL points there
case "${DATABASE_URL:-}" in
  file:/data/*)
    mkdir -p /data
    TARGET="${DATABASE_URL#file:}"
    if [ ! -f "$TARGET" ] && [ -f "$SEED_DB" ]; then
      echo "Initializing SQLite database at $TARGET from seed..."
      cp "$SEED_DB" "$TARGET"
    fi
    ;;
  *)
    if [ ! -f "$DB_FILE" ] && [ -f "$SEED_DB" ]; then
      echo "Initializing SQLite database at $DB_FILE from seed..."
      cp "$SEED_DB" "$DB_FILE"
    fi
    ;;
esac

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"
export DATABASE_URL="${DATABASE_URL:-file:./prisma/dev.db}"

echo "Starting Next.js on ${HOSTNAME}:${PORT} (DATABASE_URL=${DATABASE_URL})"
exec node server.js
