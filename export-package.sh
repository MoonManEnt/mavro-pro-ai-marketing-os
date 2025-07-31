#!/bin/bash

# Mavro Pro - Complete Application Export Script
# This script creates a deployment-ready package of the entire application

echo "🚀 Creating Mavro Pro export package..."

# Create export directory
mkdir -p mavro-pro-export

# Copy all essential project files
echo "📁 Copying project structure..."

# Root configuration files
cp package.json mavro-pro-export/
cp package-lock.json mavro-pro-export/
cp tsconfig.json mavro-pro-export/
cp vite.config.ts mavro-pro-export/
cp tailwind.config.ts mavro-pro-export/
cp postcss.config.js mavro-pro-export/
cp components.json mavro-pro-export/
cp drizzle.config.ts mavro-pro-export/
cp .replit mavro-pro-export/
cp .gitignore mavro-pro-export/
cp replit.md mavro-pro-export/

# Copy source directories
echo "📋 Copying source code..."
cp -r client/ mavro-pro-export/
cp -r server/ mavro-pro-export/
cp -r shared/ mavro-pro-export/

# Copy attached assets (if they exist)
if [ -d "attached_assets" ]; then
    cp -r attached_assets/ mavro-pro-export/
fi

# Create README for the export
cat > mavro-pro-export/README.md << 'EOF'
# Mavro Pro - AI Marketing Operating System

## Overview
Mavro Pro is a comprehensive AI-powered marketing operating system with persona-driven functionality, advanced analytics, and integrated content creation capabilities.

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Features
- 🎯 6 Business Personas (Speaking, Real Estate, MedSpa, Restaurant, Fitness, Automotive)
- 🤖 ViVi AI Assistant with voice capabilities
- 📊 FourSIGHT Analytics Dashboard
- 🎓 GRIO Academy with CMO-level marketing education
- 📱 Mobile-optimized responsive design
- 🎨 Advanced micro-animations and theming
- 🔗 Social media platform integrations
- 📈 Real-time performance tracking

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript  
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS + Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: TanStack Query + React Context

## Architecture
- Full-stack TypeScript application
- Responsive design with mobile-first approach
- Persona-based content adaptation
- Real-time data simulation for demo purposes
- Scalable component architecture

## Deployment
The application is configured for Replit deployment but can be adapted for other platforms.

For support or questions, refer to the replit.md file for detailed architecture and recent changes.
EOF

# Create deployment script
cat > mavro-pro-export/deploy.sh << 'EOF'
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
EOF

chmod +x mavro-pro-export/deploy.sh

# Create archive
echo "📦 Creating archive..."
tar -czf mavro-pro-complete.tar.gz mavro-pro-export/

echo "✅ Export complete!"
echo "📁 Files created:"
echo "   - mavro-pro-export/ (directory)"
echo "   - mavro-pro-complete.tar.gz (archive)"
echo ""
echo "🎉 Mavro Pro export package ready!"
echo "📋 To use in another workspace:"
echo "   1. Extract: tar -xzf mavro-pro-complete.tar.gz"
echo "   2. Install: cd mavro-pro-export && npm install"
echo "   3. Run: npm run dev"