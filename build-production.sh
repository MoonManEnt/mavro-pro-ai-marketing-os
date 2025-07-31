#!/bin/bash

# Production build script for Mavro OS
# This ensures all dependencies are properly included in the deployment

echo "Setting production environment..."
export NODE_ENV=production

echo "Building frontend..."
npm run build:frontend || vite build

echo "Building backend with all dependencies included..."
# Use esbuild to bundle the server with specific configuration for production
npx esbuild server/index.ts \
  --platform=node \
  --bundle \
  --format=esm \
  --outdir=dist \
  --external:pg-native \
  --external:@neondatabase/serverless \
  --sourcemap \
  --minify

echo "Production build completed successfully!"
echo "Files are ready in the dist directory."