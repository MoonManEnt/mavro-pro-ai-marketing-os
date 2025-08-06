#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Screenshot configuration for Mavro Pro platform
const screenshotConfig = {
  baseUrl: 'http://localhost:5000',
  outputDir: './ui-screenshots',
  
  // All pages and states to capture
  pages: [
    // Main Dashboard
    { 
      name: 'dashboard-plan', 
      url: '/', 
      description: 'Main Dashboard - Plan Tab',
      setup: async (page) => {
        await page.waitForSelector('[data-tab="plan"]', { timeout: 10000 });
        await page.click('[data-tab="plan"]');
        await page.waitForTimeout(1000);
      }
    },
    { 
      name: 'dashboard-track', 
      url: '/', 
      description: 'Main Dashboard - Track Tab',
      setup: async (page) => {
        await page.waitForSelector('[data-tab="track"]', { timeout: 10000 });
        await page.click('[data-tab="track"]');
        await page.waitForTimeout(1000);
      }
    },
    { 
      name: 'dashboard-grow', 
      url: '/', 
      description: 'Main Dashboard - Grow Tab',
      setup: async (page) => {
        await page.waitForSelector('[data-tab="grow"]', { timeout: 10000 });
        await page.click('[data-tab="grow"]');
        await page.waitForTimeout(1000);
      }
    },
    
    // Campaign Builder
    { 
      name: 'campaigns-builder', 
      url: '/campaigns', 
      description: 'Enhanced AI Campaign Builder - Initial State',
      waitFor: '.campaign-builder, .enhanced-ai-panel'
    },
    { 
      name: 'campaigns-voice-active', 
      url: '/campaigns', 
      description: 'Campaign Builder - Voice Input Active',
      setup: async (page) => {
        await page.waitForSelector('.voice-input-button, [data-testid="voice-input"]', { timeout: 5000 });
        await page.click('.voice-input-button, [data-testid="voice-input"]');
        await page.waitForTimeout(500);
      }
    },
    { 
      name: 'campaigns-hashtags', 
      url: '/campaigns', 
      description: 'Campaign Builder - Hashtag Selection Panel',
      setup: async (page) => {
        await page.waitForSelector('.hashtag-panel, [data-section="hashtags"]', { timeout: 5000 });
        const hashtagPanel = await page.$('.hashtag-panel, [data-section="hashtags"]');
        if (hashtagPanel) await hashtagPanel.scrollIntoView();
      }
    },
    
    // Reviews Intelligence Hub
    { 
      name: 'reviews-overview', 
      url: '/reviews', 
      description: 'Reviews Intelligence Hub - Overview',
      waitFor: '.reviews-container, .review-card'
    },
    { 
      name: 'reviews-google-filter', 
      url: '/reviews', 
      description: 'Reviews - Google Platform Filter',
      setup: async (page) => {
        await page.waitForSelector('[data-platform="google"], .platform-filter', { timeout: 5000 });
        const googleFilter = await page.$('[data-platform="google"], .platform-filter');
        if (googleFilter) await googleFilter.click();
        await page.waitForTimeout(500);
      }
    },
    
    // Compliance Center
    { 
      name: 'compliance-dashboard', 
      url: '/compliance', 
      description: 'Compliance Intelligence Center - OAuth Health Monitor',
      waitFor: '.compliance-container, .oauth-status'
    },
    { 
      name: 'compliance-flags', 
      url: '/compliance', 
      description: 'Compliance Center - Flags Panel',
      setup: async (page) => {
        await page.waitForSelector('.compliance-flags, [data-section="flags"]', { timeout: 5000 });
        const flagsPanel = await page.$('.compliance-flags, [data-section="flags"]');
        if (flagsPanel) await flagsPanel.scrollIntoView();
      }
    },
    
    // Grio Academy
    { 
      name: 'grio-academy-courses', 
      url: '/grio-academy', 
      description: 'Grio Academy - Course Catalog',
      waitFor: '.course-catalog, .course-grid'
    },
    { 
      name: 'grio-academy-progress', 
      url: '/grio-academy', 
      description: 'Grio Academy - Progress Tracking',
      setup: async (page) => {
        await page.waitForSelector('.progress-section, [data-section="progress"]', { timeout: 5000 });
        const progressSection = await page.$('.progress-section, [data-section="progress"]');
        if (progressSection) await progressSection.scrollIntoView();
      }
    },
    
    // Settings
    { 
      name: 'settings-general', 
      url: '/settings', 
      description: 'Platform Settings - General Configuration',
      waitFor: '.settings-container, .settings-panel'
    }
  ],
  
  // Responsive viewports
  viewports: [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ],
  
  // Interactive states to capture
  interactiveStates: [
    {
      name: 'vivi-chat-open',
      description: 'ViVi AI Chat Widget - Open State',
      setup: async (page) => {
        await page.goto('http://localhost:5000');
        await page.waitForTimeout(2000);
        const chatButton = await page.$('.vivi-chat-button, [data-testid="vivi-chat"]');
        if (chatButton) {
          await chatButton.click();
          await page.waitForTimeout(1000);
        }
      }
    },
    {
      name: 'post-preview-modal',
      description: 'Post Preview Modal - Open State',
      setup: async (page) => {
        await page.goto('http://localhost:5000/campaigns');
        await page.waitForTimeout(2000);
        const previewButton = await page.$('.preview-button, [data-action="preview"]');
        if (previewButton) {
          await previewButton.click();
          await page.waitForTimeout(1000);
        }
      }
    },
    {
      name: 'ai-generation-progress',
      description: 'AI Content Generation - In Progress',
      setup: async (page) => {
        await page.goto('http://localhost:5000/campaigns');
        await page.waitForTimeout(2000);
        const aiButton = await page.$('.ai-generate-button, [data-action="generate-ai"]');
        if (aiButton) {
          await aiButton.click();
          await page.waitForTimeout(500);
        }
      }
    }
  ]
};

async function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function generateScreenshots() {
  console.log('🚀 Starting Mavro Pro UI Screenshot Generation...\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Create output directories
  await createDirectory(screenshotConfig.outputDir);
  await createDirectory(path.join(screenshotConfig.outputDir, 'desktop'));
  await createDirectory(path.join(screenshotConfig.outputDir, 'tablet'));
  await createDirectory(path.join(screenshotConfig.outputDir, 'mobile'));
  await createDirectory(path.join(screenshotConfig.outputDir, 'interactive'));
  
  let totalScreenshots = 0;
  const manifest = {
    generatedAt: new Date().toISOString(),
    platform: 'Mavro Pro AI Marketing OS',
    screenshots: []
  };

  // Generate responsive screenshots for each page
  for (const viewport of screenshotConfig.viewports) {
    console.log(`📱 Capturing ${viewport.name} screenshots (${viewport.width}x${viewport.height})...\n`);
    
    for (const pageConfig of screenshotConfig.pages) {
      try {
        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewport({ 
          width: viewport.width, 
          height: viewport.height 
        });
        
        // Navigate to page
        const fullUrl = `${screenshotConfig.baseUrl}${pageConfig.url}`;
        await page.goto(fullUrl, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        
        // Wait for specific elements or perform setup
        if (pageConfig.waitFor) {
          try {
            await page.waitForSelector(pageConfig.waitFor, { timeout: 5000 });
          } catch (e) {
            console.log(`⚠️  Warning: ${pageConfig.waitFor} not found on ${pageConfig.name}`);
          }
        }
        
        if (pageConfig.setup) {
          try {
            await pageConfig.setup(page);
          } catch (e) {
            console.log(`⚠️  Warning: Setup failed for ${pageConfig.name}: ${e.message}`);
          }
        }
        
        // Additional wait for dynamic content
        await page.waitForTimeout(2000);
        
        // Generate filename
        const filename = `${pageConfig.name}-${viewport.name}.png`;
        const filepath = path.join(screenshotConfig.outputDir, viewport.name, filename);
        
        // Take screenshot
        await page.screenshot({
          path: filepath,
          fullPage: true,
          type: 'png'
        });
        
        // Add to manifest
        manifest.screenshots.push({
          name: pageConfig.name,
          viewport: viewport.name,
          filename: filename,
          description: pageConfig.description,
          url: pageConfig.url,
          size: `${viewport.width}x${viewport.height}`
        });
        
        console.log(`✅ Generated: ${filename}`);
        totalScreenshots++;
        
        await page.close();
        
      } catch (error) {
        console.error(`❌ Error capturing ${pageConfig.name} (${viewport.name}): ${error.message}`);
      }
    }
  }
  
  // Generate interactive state screenshots
  console.log(`\n🎯 Capturing interactive states...\n`);
  
  for (const stateConfig of screenshotConfig.interactiveStates) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      if (stateConfig.setup) {
        await stateConfig.setup(page);
      }
      
      const filename = `${stateConfig.name}.png`;
      const filepath = path.join(screenshotConfig.outputDir, 'interactive', filename);
      
      await page.screenshot({
        path: filepath,
        fullPage: true,
        type: 'png'
      });
      
      manifest.screenshots.push({
        name: stateConfig.name,
        viewport: 'desktop',
        filename: `interactive/${filename}`,
        description: stateConfig.description,
        category: 'interactive'
      });
      
      console.log(`✅ Generated: ${filename}`);
      totalScreenshots++;
      
      await page.close();
      
    } catch (error) {
      console.error(`❌ Error capturing ${stateConfig.name}: ${error.message}`);
    }
  }
  
  // Save manifest
  fs.writeFileSync(
    path.join(screenshotConfig.outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  // Generate HTML gallery
  await generateHTMLGallery(manifest);
  
  await browser.close();
  
  console.log(`\n🎉 Screenshot generation complete!`);
  console.log(`📊 Total screenshots: ${totalScreenshots}`);
  console.log(`📁 Output directory: ${screenshotConfig.outputDir}`);
  console.log(`🌐 View gallery: ${path.join(screenshotConfig.outputDir, 'gallery.html')}`);
}

async function generateHTMLGallery(manifest) {
  const galleryHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mavro Pro UI Screenshots Gallery</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%); 
            color: white; 
            padding: 3rem 2rem; 
            text-align: center; 
        }
        .header h1 { 
            font-size: 2.5rem; 
            font-weight: 900; 
            margin-bottom: 1rem; 
        }
        .header p { 
            font-size: 1.1rem; 
            opacity: 0.9; 
        }
        .stats { 
            display: flex; 
            justify-content: center; 
            gap: 2rem; 
            margin-top: 2rem; 
        }
        .stat { 
            text-align: center; 
        }
        .stat-number { 
            font-size: 2rem; 
            font-weight: 800; 
        }
        .stat-label { 
            font-size: 0.9rem; 
            opacity: 0.8; 
        }
        .filter-bar { 
            padding: 2rem; 
            border-bottom: 1px solid #e5e7eb; 
            background: #f9fafb;
        }
        .filter-buttons { 
            display: flex; 
            gap: 1rem; 
            justify-content: center; 
            flex-wrap: wrap; 
        }
        .filter-btn { 
            padding: 0.75rem 1.5rem; 
            border: 2px solid #8B5CF6; 
            background: white; 
            color: #8B5CF6; 
            border-radius: 50px; 
            font-weight: 600; 
            cursor: pointer; 
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .filter-btn:hover, .filter-btn.active { 
            background: #8B5CF6; 
            color: white; 
            transform: translateY(-2px); 
        }
        .gallery { 
            padding: 2rem; 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); 
            gap: 2rem; 
        }
        .screenshot-card { 
            background: white; 
            border-radius: 16px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
            overflow: hidden; 
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
        }
        .screenshot-card:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2); 
        }
        .screenshot-img { 
            width: 100%; 
            height: auto; 
            display: block; 
        }
        .card-content { 
            padding: 1.5rem; 
        }
        .card-title { 
            font-size: 1.25rem; 
            font-weight: 700; 
            margin-bottom: 0.5rem; 
            color: #1f2937; 
        }
        .card-description { 
            color: #6b7280; 
            margin-bottom: 1rem; 
            line-height: 1.5; 
        }
        .card-meta { 
            display: flex; 
            gap: 1rem; 
            font-size: 0.875rem; 
        }
        .meta-item { 
            background: #f3f4f6; 
            padding: 0.25rem 0.75rem; 
            border-radius: 20px; 
            color: #374151; 
            font-weight: 500; 
        }
        .viewport-desktop { border-left: 4px solid #10b981; }
        .viewport-tablet { border-left: 4px solid #f59e0b; }
        .viewport-mobile { border-left: 4px solid #ef4444; }
        .viewport-interactive { border-left: 4px solid #8b5cf6; }
        @media (max-width: 768px) {
            .gallery { grid-template-columns: 1fr; }
            .header h1 { font-size: 2rem; }
            .stats { flex-direction: column; gap: 1rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mavro Pro UI Screenshots</h1>
            <p>Complete visual documentation of every page, component, and interaction</p>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">${manifest.screenshots.length}</div>
                    <div class="stat-label">Screenshots</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${new Set(manifest.screenshots.map(s => s.viewport)).size}</div>
                    <div class="stat-label">Viewports</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${new Set(manifest.screenshots.map(s => s.name)).size}</div>
                    <div class="stat-label">Pages</div>
                </div>
            </div>
        </div>
        
        <div class="filter-bar">
            <div class="filter-buttons">
                <a href="#" class="filter-btn active" data-filter="all">All</a>
                <a href="#" class="filter-btn" data-filter="desktop">Desktop</a>
                <a href="#" class="filter-btn" data-filter="tablet">Tablet</a>
                <a href="#" class="filter-btn" data-filter="mobile">Mobile</a>
                <a href="#" class="filter-btn" data-filter="interactive">Interactive</a>
            </div>
        </div>
        
        <div class="gallery" id="gallery">
            ${manifest.screenshots.map(screenshot => `
                <div class="screenshot-card viewport-${screenshot.viewport}" data-viewport="${screenshot.viewport}">
                    <img src="${screenshot.filename}" alt="${screenshot.description}" class="screenshot-img">
                    <div class="card-content">
                        <h3 class="card-title">${screenshot.description || screenshot.name}</h3>
                        <p class="card-description">${screenshot.url || ''}</p>
                        <div class="card-meta">
                            <span class="meta-item">${screenshot.viewport}</span>
                            ${screenshot.size ? `<span class="meta-item">${screenshot.size}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <script>
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter cards
                const filter = btn.dataset.filter;
                const cards = document.querySelectorAll('.screenshot-card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.viewport === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>
  `;
  
  fs.writeFileSync(
    path.join(screenshotConfig.outputDir, 'gallery.html'),
    galleryHTML
  );
}

// Run the screenshot generator
if (require.main === module) {
  generateScreenshots().catch(console.error);
}

module.exports = { generateScreenshots, screenshotConfig };