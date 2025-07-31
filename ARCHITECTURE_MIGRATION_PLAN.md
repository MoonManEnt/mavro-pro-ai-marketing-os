# Mavro Pro - Architecture Migration Plan

## 🎯 MIGRATION OBJECTIVE

Transform the current monolithic structure to the recommended modular monorepo architecture based on the provided project structure document.

## 📋 CURRENT STATE vs TARGET STATE

### Current Structure (Problems):
```
mavro-pro/
├── client/src/          # Frontend (mostly good)
├── server/              # Monolithic backend
│   ├── routes.ts        # 300+ lines, all routes in one file
│   ├── auth.ts          # Mixed concerns
│   ├── storage.ts       # Direct DB calls in routes
│   └── index.ts         # Server bootstrap
└── shared/schema.ts     # Good foundation
```

### Target Structure (Recommended):
```
mavro-pro-beta/
├── client/
│   ├── src/
│   │   ├── api/         # HTTP wrappers (NEW)
│   │   ├── components/  # ✓ Already good
│   │   ├── contexts/    # ✓ Already good  
│   │   ├── hooks/       # ✓ Already good
│   │   ├── pages/       # ✓ Already good
│   │   ├── styles/      # ✓ Move CSS here
│   │   └── types/       # NEW - separate types
│   └── vite.config.ts

├── server/
│   ├── src/
│   │   ├── routes/      # Split route files
│   │   ├── controllers/ # Business logic (NEW)
│   │   ├── services/    # DB & external APIs (NEW)
│   │   ├── middlewares/ # Auth, validation (NEW)
│   │   └── utils/       # Schemas, helpers (NEW)
│   └── tsconfig.json

├── shared/              # ✓ Already exists
├── docker-compose.yml   # NEW - PostgreSQL container
└── .env.example         # NEW - Environment template
```

## 🚀 PHASE 1: Backend Restructuring (Priority: CRITICAL)

### Step 1: Create Service Layer
**Target**: Extract database operations from routes into dedicated services

**Files to Create**:
```typescript
// server/src/services/db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../shared/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// server/src/services/userService.ts
export class UserService {
  async getUserById(id: string) { /* Clean DB logic */ }
  async updateUser(id: string, data: any) { /* Clean DB logic */ }
  async deleteUser(id: string) { /* Clean DB logic */ }
}

// server/src/services/campaignService.ts
export class CampaignService {
  async getCampaignsByUserId(userId: string) { /* Clean DB logic */ }
  async createCampaign(data: any) { /* Clean DB logic */ }
  async updateCampaign(id: string, data: any) { /* Clean DB logic */ }
}

// server/src/services/viviService.ts
export class ViViService {
  async sendToViVi(prompt: string): Promise<string> { /* OpenAI logic */ }
  async saveViViLog(log: ViViLog) { /* Logging logic */ }
}
```

### Step 2: Create Controller Layer
**Target**: Move business logic from routes to controllers

**Files to Create**:
```typescript
// server/src/controllers/authController.ts
export class AuthController {
  async register(reqData: RegisterData) { /* Auth logic */ }
  async login(req: Request, data: LoginData) { /* Auth logic */ }
  async logout(req: Request, res: Response) { /* Logout logic */ }
}

// server/src/controllers/userController.ts  
export class UserController {
  async getUser(req: AuthenticatedRequest, res: Response) { /* User logic */ }
  async updateUser(req: AuthenticatedRequest, res: Response) { /* Update logic */ }
}

// server/src/controllers/viviController.ts
export class ViViController {
  async chat(req: AuthenticatedRequest, res: Response) { /* ViVi chat logic */ }
  async generateContent(req: AuthenticatedRequest, res: Response) { /* Content generation */ }
}
```

### Step 3: Create Middleware Layer
**Target**: Centralize authentication, validation, and error handling

**Files to Create**:
```typescript
// server/src/middlewares/authenticate.ts
export function authenticate(req: Request, res: Response, next: NextFunction) {
  // Clean authentication logic
}

// server/src/middlewares/validateRequest.ts
export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Zod validation logic
  };
}

// server/src/middlewares/errorHandler.ts
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // Centralized error handling
}
```

### Step 4: Split Route Files
**Target**: Break monolithic routes.ts into focused route files

**Files to Create**:
```typescript
// server/src/routes/auth.ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { authSchemas } from '../utils/schemas';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRequest(authSchemas.register), authController.register);
router.post('/login', validateRequest(authSchemas.login), authController.login);
router.post('/logout', authController.logout);

export default router;

// server/src/routes/users.ts
// server/src/routes/campaigns.ts  
// server/src/routes/vivi.ts
// etc.
```

## 🚀 PHASE 2: Frontend API Layer (Priority: HIGH)

### Step 1: Create API Wrapper Layer
**Target**: Centralize HTTP requests and error handling

**Files to Create**:
```typescript
// client/src/api/base.ts
export class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL;
  
  async request(method: string, endpoint: string, data?: any) {
    // Centralized HTTP logic with error handling
  }
}

// client/src/api/auth.ts
export class AuthAPI extends ApiClient {
  async login(email: string, password: string) { /* Auth API calls */ }
  async register(userData: RegisterData) { /* Register API calls */ }
  async logout() { /* Logout API calls */ }
}

// client/src/api/vivi.ts
export class ViViAPI extends ApiClient {
  async sendToViVi(prompt: string): Promise<ViViResponse> { /* ViVi API calls */ }
  async generateContent(data: ContentRequest): Promise<ContentResponse> { /* Content API */ }
}
```

### Step 2: Create Types Directory
**Target**: Centralize TypeScript types

**Files to Create**:
```typescript
// client/src/types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// client/src/types/vivi.ts
export interface ViViResponse {
  text: string;
  confidence: number;
  suggestions?: string[];
}

// client/src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
```

## 🚀 PHASE 3: Docker Integration (Priority: MEDIUM)

### Step 1: Create Docker Configuration
**Files to Create**:

```yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: mavro
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mavro_pro
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
      
  server:
    build: ./server
    env_file: .env
    depends_on:
      - db
    ports:
      - '4000:4000'
    environment:
      - DATABASE_URL=postgresql://mavro:secret@db:5432/mavro_pro
      
volumes:
  db-data:
```

```dockerfile
# server/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
```

### Step 2: Environment Configuration
```bash
# .env.example
DATABASE_URL=postgresql://mavro:secret@localhost:5432/mavro_pro
OPENAI_API_KEY=your_openai_key
SESSION_SECRET=your_session_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 📊 MIGRATION TIMELINE

### Week 1: Backend Restructuring
- [ ] Day 1-2: Create service layer (db.ts, userService.ts, campaignService.ts, viviService.ts)
- [ ] Day 3-4: Create controller layer (authController.ts, userController.ts, viviController.ts)
- [ ] Day 5: Create middleware layer (authenticate.ts, validateRequest.ts, errorHandler.ts)

### Week 2: Route Refactoring  
- [ ] Day 1-2: Split routes.ts into focused route files
- [ ] Day 3-4: Update all route handlers to use controllers
- [ ] Day 5: Test and fix TypeScript errors

### Week 3: Frontend API Layer
- [ ] Day 1-2: Create API wrapper classes
- [ ] Day 3-4: Create types directory and interfaces
- [ ] Day 5: Update components to use new API layer

### Week 4: Docker & Environment
- [ ] Day 1-2: Create Docker configuration
- [ ] Day 3-4: Set up environment management
- [ ] Day 5: Test full docker-compose setup

## 🎯 SUCCESS METRICS

- [ ] **Zero TypeScript Errors**: All 22 current errors resolved
- [ ] **Modular Architecture**: Clear separation of concerns
- [ ] **Performance Improvement**: 20%+ reduction in bundle size
- [ ] **Security Enhancement**: Proper authentication middleware
- [ ] **Developer Experience**: Easier to add new features
- [ ] **Scalability**: Ready for 10x user growth

## 🚨 RISKS & MITIGATION

### Risk 1: Breaking Changes During Migration
**Mitigation**: Implement changes incrementally, maintain backward compatibility

### Risk 2: Database Migration Issues
**Mitigation**: Use Drizzle migrations, backup before changes

### Risk 3: Frontend API Integration
**Mitigation**: Create API wrapper with fallback to existing endpoints

### Risk 4: Docker Configuration Complexity
**Mitigation**: Start with simple setup, add complexity gradually

This migration plan provides a clear path from the current monolithic structure to the recommended modular architecture, addressing the key issues identified in the codebase analysis.