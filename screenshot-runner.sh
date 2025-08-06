#!/bin/bash

# Mavro Pro UI Screenshot Generator
# This script automates the capture of all UI areas and pages

echo "🚀 Mavro Pro UI Screenshot Generator"
echo "====================================="

# Check if server is running
if ! curl -s http://localhost:5000 > /dev/null; then
    echo "❌ Error: Mavro Pro server is not running on localhost:5000"
    echo "Please start the server first with: npm run dev"
    exit 1
fi

echo "✅ Server is running on localhost:5000"

# Install puppeteer if not already installed
if ! npm list puppeteer > /dev/null 2>&1; then
    echo "📦 Installing Puppeteer..."
    npm install puppeteer
fi

# Create screenshots directory
mkdir -p ui-screenshots/{desktop,tablet,mobile,interactive}

echo "📸 Starting screenshot capture..."
echo "This will capture:"
echo "   • All main pages (Dashboard, Campaigns, Reviews, etc.)"
echo "   • All responsive viewports (Desktop, Tablet, Mobile)"
echo "   • Interactive states (Modals, Chat Widget, etc.)"
echo "   • Component variations and states"
echo ""

# Run the screenshot generator
node generate-screenshots.js

# Check if screenshots were generated
if [ -d "ui-screenshots" ] && [ "$(ls -A ui-screenshots)" ]; then
    echo ""
    echo "🎉 Screenshot generation complete!"
    echo "📁 Screenshots saved to: ./ui-screenshots/"
    echo "🌐 View gallery: ./ui-screenshots/gallery.html"
    echo ""
    echo "📊 Generated screenshots:"
    find ui-screenshots -name "*.png" | wc -l | xargs echo "   Total PNG files:"
    echo ""
    echo "🔍 Directory structure:"
    tree ui-screenshots/ 2>/dev/null || ls -la ui-screenshots/
    echo ""
    echo "💡 Next steps:"
    echo "   1. Open gallery.html in your browser to view all screenshots"
    echo "   2. Use screenshots for documentation, presentations, or design reviews"
    echo "   3. Share with stakeholders or team members"
else
    echo "❌ Error: No screenshots were generated"
    echo "Check the console output above for any errors"
    exit 1
fi