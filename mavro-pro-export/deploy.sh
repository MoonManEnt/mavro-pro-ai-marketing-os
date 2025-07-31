#!/bin/bash

echo "🚀 Deploying Mavro Pro..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Start production server
echo "🌟 Starting production server..."
npm start

echo "✅ Mavro Pro deployed successfully!"
