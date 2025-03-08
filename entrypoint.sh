#!/bin/sh
if [ "$NODE_ENV" = "development" ]; then
  echo "Starting in development mode with hot reloading..."
  exec bun run dev
else
  echo "Starting in production mode..."
  exec pm2-runtime start pm2.config.js --watch
fi