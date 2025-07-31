# Mavro Pro - Complete Installation Guide

## 📋 Project Overview

Mavro Pro is a comprehensive AI-powered marketing operating system with:
- **6 Business Personas**: Speaking, Real Estate, MedSpa, Restaurant, Fitness, Automotive
- **ViVi AI Assistant**: Voice-enabled AI with contextual responses
- **FourSIGHT Analytics**: Real-time performance tracking and insights
- **GRIO Academy**: CMO-level marketing education platform
- **Multi-platform Integration**: Social media management and scheduling
- **Advanced UI/UX**: Micro-animations, responsive design, and theming

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional - uses in-memory storage by default)

### Installation Steps

1. **Extract the package**
   ```bash
   tar -xzf mavro-pro-complete.tar.gz
   cd mavro-pro-export
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:5000 in your browser
   - Default persona: Kemar Hinds (Keynote Speaker)

## 📁 Project Structure

```
mavro-pro-export/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── main.tsx       # Entry point
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage interface
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas
├── attached_assets/      # Additional components and assets
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Build configuration
```

## 🎯 Key Features

### Business Personas
- **Kemar Hinds**: Keynote Speaker & Thought Leader
- **Karen Thompson**: Real Estate Agent
- **Sarah Martinez**: MedSpa Owner
- **Marco Romano**: Restaurant Owner
- **Alex Chen**: Fitness Coach
- **David Wilson**: Auto Dealer

### Main Application Tabs
- **Plan**: Content creation and campaign planning
- **Track**: Performance monitoring and analytics
- **Grow**: FourSIGHT analytics dashboard
- **Learn**: GRIO Academy with CMO-level courses

### Advanced Features
- Voice-activated content creation
- Real-time performance simulation
- Persona-specific content adaptation
- Mobile-optimized responsive design
- Advanced micro-animations
- Social media platform integrations

## 🔧 Configuration

### Environment Variables
The application uses in-memory storage by default. For production with PostgreSQL:

```bash
# Optional - for PostgreSQL
DATABASE_URL=your_postgresql_connection_string
```

### Customization
- **Personas**: Edit `ExactMavroPlusDashboard.tsx` to modify persona data
- **Themes**: Update `tailwind.config.ts` for color schemes
- **Content**: Modify course content in the GRIO Academy section

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Replit Deployment (Recommended)
1. Upload the exported files to a new Replit workspace
2. Run `npm install`
3. Use the "Start application" workflow or run `npm run dev`

## 📊 Demo Data

The application includes comprehensive demo data for all personas:
- Sample campaigns and performance metrics
- Educational courses and content
- Social media integration examples
- Analytics dashboards with realistic data

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-optimized interactions

### Animations
- Micro-animations for enhanced user experience
- Persona-specific color schemes
- Smooth transitions and hover effects

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## 🔍 Troubleshooting

### Common Issues
1. **Port conflicts**: Change port in `server/index.ts`
2. **Build errors**: Clear node_modules and reinstall
3. **Voice features**: Requires HTTPS in production

### Performance Optimization
- Uses TanStack Query for efficient data fetching
- Implements lazy loading for components
- Optimized bundle size with tree shaking

## 📈 Scaling

The application is designed for scalability:
- **Database**: Ready for PostgreSQL production deployment
- **API**: RESTful architecture with proper error handling
- **Frontend**: Component-based architecture for easy maintenance

## 🆘 Support

For issues or questions:
1. Check the `replit.md` file for detailed architecture notes
2. Review recent changes and implementation details
3. Examine component documentation in source files

## 📝 License

This is a complete marketing operating system built for demonstration and production use. All components are included and ready for deployment.

---

**Created**: January 15, 2025
**Version**: Complete Export Package
**Status**: Production Ready