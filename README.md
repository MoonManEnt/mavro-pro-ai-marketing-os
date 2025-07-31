# Mavro Pro - AI Marketing Operating System

<div align="center">

![Mavro Pro Logo](https://img.shields.io/badge/Mavro%20Pro-AI%20Marketing%20OS-8B5CF6?style=for-the-badge&logo=react)

**The Ultimate AI-Powered Marketing Command Center**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)]()
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)]()

</div>

## 🚀 Overview

**Mavro Pro** is a production-ready AI-powered marketing operating system that combines enterprise-grade backend functionality with a polished, persona-driven frontend experience. The application serves as a comprehensive marketing management platform with AI assistance, campaign management, analytics, and content creation capabilities.

### ✨ Key Features

- **🤖 ViVi AI Assistant** - GPT-4 powered marketing intelligence
- **📊 Plan/Track/Grow Command Center** - Comprehensive campaign management
- **🎯 Real-time Analytics** - Live KPI tracking and performance insights
- **📱 Multi-Platform Publishing** - Instagram, LinkedIn, TikTok, YouTube, Facebook
- **🔐 Enterprise Security** - JWT authentication with bcrypt encryption
- **🎨 Executive Command Minimalism** - Premium UI/UX design system
- **📈 Performance Dashboards** - Real-time ROI and engagement tracking

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for build system and hot reloading
- **Tailwind CSS** with custom design system
- **Radix UI** components for accessibility
- **TanStack Query** for state management
- **Framer Motion** for animations

### Backend Stack
- **Express.js** server framework
- **PostgreSQL** with Drizzle ORM
- **JWT** authentication with bcrypt
- **OpenAI API** integration
- **Session management** with secure cookies

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key (optional)

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/mavro-pro-ai-marketing-os.git
cd mavro-pro-ai-marketing-os
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here
SESSION_SECRET=your-session-secret-key-here

# OpenAI Integration (Optional)
OPENAI_API_KEY=your-openai-api-key-here

# Environment
NODE_ENV=development
PORT=5000
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5000` to see the application.

## 📱 Features Overview

### Command Center
- **Plan Tab**: GTM planning, Mavro Magic Studio™ content wizard, scheduler
- **Track Tab**: Performance analytics, engagement metrics, platform insights  
- **Grow Tab**: KPI dashboard, ViVi strategy optimization, growth opportunities

### ViVi AI Integration
- Real-time chat with persona-specific responses
- AI-powered content generation across platforms
- Campaign performance analysis and recommendations
- Industry-specific automation workflows

### Authentication System
- Secure JWT-based authentication
- User registration and onboarding flow
- Session management with PostgreSQL
- Demo mode for testing and evaluation

## 🎨 Design System

**Executive Command Minimalism** - The established design philosophy featuring:

- Ultra-clean white foundations with sophisticated gradient overlays
- Enterprise-grade visual hierarchy with premium typography
- Surgical use of color for functional purpose
- Micro-interaction sophistication with hover scaling and shadow transitions
- Rounded-3xl architecture with shadow-2xl depth systems

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Production Scripts
```bash
# Start production server
npm start

# Type checking
npm run check

# Database migrations
npm run db:push
```

### Deployment Platforms
Ready for deployment on:
- **Vercel** - Frontend & API routes
- **Railway** - Full-stack with PostgreSQL
- **Render** - Complete application hosting
- **AWS/Google Cloud/Azure** - Enterprise deployment

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `POST /api/auth/logout` - User logout

### ViVi AI Endpoints  
- `POST /api/vivi/chat` - AI chat interface
- `POST /api/vivi/generate-content` - Content generation
- `POST /api/vivi/analyze-campaign` - Campaign analysis

### Campaign Management
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

## 🔧 Development

### Project Structure
```
mavro-pro-ai-marketing-os/
├── client/src/              # React frontend
│   ├── components/          # UI components
│   ├── pages/              # Route pages
│   ├── contexts/           # State management
│   └── hooks/              # Custom hooks
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── db.ts              # Database connection
│   └── middleware/         # Auth middleware
├── shared/                 # Shared types
│   └── schema.ts          # Database schema
└── package.json           # Dependencies
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Update database schema

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: See `COMPLETE_UI_UX_APPLICATION_EXPORT.md`
- **Architecture**: See `replit.md`

## 💬 Support

For support, email [your-email@domain.com] or create an issue in this repository.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and AI**

[⭐ Star this repository](https://github.com/YOUR_USERNAME/mavro-pro-ai-marketing-os) if you find it helpful!

</div># mavro-pro-ai-marketing-os
