# ViVi AI Integration Guide

## Overview
This guide provides detailed instructions for integrating your ViVi AI codebase into the Mavro Pro platform, converting it from a demo to a fully functional AI-powered marketing system.

## Integration Architecture

### Current Structure
The application is now prepared for ViVi AI integration with the following structure:

```
server/
├── routes/
│   └── vivi.ts          # ViVi AI API endpoints
├── middleware/
│   └── auth.ts          # Authentication middleware
├── vivi-ai/             # [CREATE THIS] Your ViVi AI codebase location
│   ├── core/            # Core ViVi AI functionality
│   ├── models/          # AI models and algorithms
│   ├── utils/           # Utility functions
│   └── config/          # ViVi AI configuration
└── storage/
    └── dbStorage.ts     # Database integration
```

## Step-by-Step Integration Process

### Step 1: Upload ViVi AI Codebase

1. **Create the ViVi AI directory:**
   ```bash
   mkdir -p server/vivi-ai
   ```

2. **Upload your ViVi AI codebase:**
   - Copy your entire ViVi AI codebase to `server/vivi-ai/`
   - Ensure all dependencies are included
   - Verify all configuration files are present

3. **Install ViVi AI dependencies:**
   ```bash
   # Add any ViVi AI specific dependencies to package.json
   npm install [your-vivi-ai-dependencies]
   ```

### Step 2: Configure ViVi AI Integration

1. **Create ViVi AI configuration file:**
   ```typescript
   // server/vivi-ai/config/index.ts
   export const viviConfig = {
     apiKey: process.env.VIVI_API_KEY,
     apiUrl: process.env.VIVI_API_URL || 'http://localhost:8080',
     modelPath: process.env.VIVI_MODEL_PATH || './models',
     maxTokens: parseInt(process.env.VIVI_MAX_TOKENS || '2048'),
     temperature: parseFloat(process.env.VIVI_TEMPERATURE || '0.7'),
     timeout: parseInt(process.env.VIVI_TIMEOUT || '30000'),
   };
   ```

2. **Create ViVi AI wrapper class:**
   ```typescript
   // server/vivi-ai/viviAI.ts
   import { viviConfig } from './config';
   
   export class ViViAI {
     private initialized = false;
     
     async initialize() {
       if (this.initialized) return;
       
       // Initialize your ViVi AI system here
       // Load models, connect to services, etc.
       
       this.initialized = true;
     }
     
     async generateResponse(message: string, context: any, persona: string): Promise<string> {
       await this.initialize();
       
       // Your ViVi AI response generation logic here
       // This should call your actual ViVi AI system
       
       return "Generated response from ViVi AI";
     }
     
     async generateContent(data: any, persona: string): Promise<any> {
       await this.initialize();
       
       // Your ViVi AI content generation logic here
       
       return {
         text: "Generated content",
         hashtags: ["#AI", "#Marketing"],
         characterCount: 280
       };
     }
     
     async generateAnalytics(data: any, persona: string): Promise<any> {
       await this.initialize();
       
       // Your ViVi AI analytics generation logic here
       
       return {
         insights: ["Key insight 1", "Key insight 2"],
         recommendations: ["Recommendation 1", "Recommendation 2"],
         performance: {
           engagement: 85,
           reach: 1200,
           conversion: 3.5
         }
       };
     }
   }
   
   export const viviAI = new ViViAI();
   ```

### Step 3: Update API Routes

Replace the placeholder functions in `server/routes/vivi.ts`:

```typescript
// Import your ViVi AI system
import { viviAI } from '../vivi-ai/viviAI';

// Replace placeholder functions with actual ViVi AI calls
function generateViViResponse(message: string, context: any, persona: string): Promise<string> {
  return viviAI.generateResponse(message, context, persona);
}

function generateViViContent(data: any, persona: string): Promise<any> {
  return viviAI.generateContent(data, persona);
}

function generateViViAnalytics(data: any, persona: string): Promise<any> {
  return viviAI.generateAnalytics(data, persona);
}
```

### Step 4: Frontend Integration

1. **Create ViVi AI service:**
   ```typescript
   // client/src/services/viviService.ts
   export class ViViService {
     async chat(message: string, context?: any) {
       const response = await fetch('/api/vivi/chat', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
         body: JSON.stringify({ message, context })
       });
       
       if (!response.ok) throw new Error('Chat request failed');
       return response.json();
     }
     
     async generateContent(type: string, platform: string, context: any) {
       const response = await fetch('/api/vivi/generate-content', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
         body: JSON.stringify({ type, platform, context })
       });
       
       if (!response.ok) throw new Error('Content generation failed');
       return response.json();
     }
     
     async getAnalytics(userId: number, timeRange: string = '30d') {
       const response = await fetch('/api/vivi/analytics', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
         body: JSON.stringify({ userId, timeRange })
       });
       
       if (!response.ok) throw new Error('Analytics request failed');
       return response.json();
     }
   }
   
   export const viviService = new ViViService();
   ```

2. **Update existing components:**
   ```typescript
   // Update FloatingViVi component to use real ViVi AI
   import { viviService } from '../services/viviService';
   
   const handleSendMessage = async (message: string) => {
     try {
       const response = await viviService.chat(message, {
         persona: currentPersona,
         currentPage: window.location.pathname
       });
       
       setMessages(prev => [...prev, {
         id: Date.now(),
         content: response.response.message,
         sender: 'vivi',
         timestamp: new Date()
       }]);
     } catch (error) {
       console.error('ViVi chat error:', error);
     }
   };
   ```

### Step 5: Real-Time Features

1. **WebSocket Integration (Optional):**
   ```typescript
   // server/websocket.ts
   import { WebSocketServer } from 'ws';
   import { viviAI } from './vivi-ai/viviAI';
   
   export function setupWebSocket(server: any) {
     const wss = new WebSocketServer({ server });
     
     wss.on('connection', (ws) => {
       ws.on('message', async (message) => {
         const data = JSON.parse(message.toString());
         
         if (data.type === 'vivi_chat') {
           const response = await viviAI.generateResponse(
             data.message, 
             data.context, 
             data.persona
           );
           
           ws.send(JSON.stringify({
             type: 'vivi_response',
             response
           }));
         }
       });
     });
   }
   ```

### Step 6: Database Integration

1. **Create ViVi AI conversation history:**
   ```typescript
   // Add to shared/schema.ts
   export const viviConversations = pgTable("vivi_conversations", {
     id: serial("id").primaryKey(),
     userId: integer("user_id").references(() => users.id),
     message: text("message").notNull(),
     response: text("response").notNull(),
     context: json("context"),
     persona: text("persona").notNull(),
     createdAt: timestamp("created_at").defaultNow()
   });
   ```

2. **Update storage interface:**
   ```typescript
   // Add to server/storage.ts
   interface IStorage {
     // ... existing methods
     
     // ViVi AI conversation history
     saveViViConversation(conversation: InsertViViConversation): Promise<ViViConversation>;
     getViViConversationHistory(userId: number): Promise<ViViConversation[]>;
   }
   ```

### Step 7: Performance Optimization

1. **Caching Strategy:**
   ```typescript
   // server/cache/viviCache.ts
   import NodeCache from 'node-cache';
   
   const viviCache = new NodeCache({ stdTTL: 600 }); // 10 minutes
   
   export async function getCachedResponse(key: string, generator: () => Promise<any>) {
     const cached = viviCache.get(key);
     if (cached) return cached;
     
     const result = await generator();
     viviCache.set(key, result);
     return result;
   }
   ```

2. **Rate Limiting:**
   ```typescript
   // server/middleware/rateLimiter.ts
   import rateLimit from 'express-rate-limit';
   
   export const viviRateLimit = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: 'Too many ViVi AI requests from this IP, please try again later.',
     standardHeaders: true,
     legacyHeaders: false,
   });
   ```

## Testing Integration

### 1. Unit Tests
```typescript
// tests/vivi.test.ts
import { viviAI } from '../server/vivi-ai/viviAI';

describe('ViVi AI Integration', () => {
  test('should generate response', async () => {
    const response = await viviAI.generateResponse(
      'Hello ViVi',
      { persona: 'kemar' },
      'kemar'
    );
    
    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
  });
});
```

### 2. Integration Tests
```bash
# Test ViVi AI endpoints
curl -X POST http://localhost:5000/api/vivi/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello ViVi", "context": {"persona": "kemar"}}'
```

## Environment Configuration

Add these variables to your `.env` file:

```env
# ViVi AI Configuration
VIVI_API_KEY=your-vivi-ai-api-key
VIVI_API_URL=http://localhost:8080
VIVI_MODEL_PATH=./server/vivi-ai/models
VIVI_MAX_TOKENS=2048
VIVI_TEMPERATURE=0.7
VIVI_TIMEOUT=30000

# Optional: ViVi AI Database
VIVI_DB_URL=postgresql://username:password@host:port/vivi_db
```

## Monitoring and Logging

1. **ViVi AI Metrics:**
   ```typescript
   // server/monitoring/viviMetrics.ts
   export class ViViMetrics {
     static trackRequest(endpoint: string, duration: number, success: boolean) {
       // Log ViVi AI request metrics
       console.log(`ViVi AI ${endpoint}: ${duration}ms, success: ${success}`);
     }
     
     static trackError(error: Error, context: any) {
       // Log ViVi AI errors
       console.error('ViVi AI Error:', error.message, context);
     }
   }
   ```

## Security Considerations

1. **API Key Management:**
   - Store ViVi AI API keys securely
   - Rotate keys regularly
   - Use environment variables only

2. **Input Validation:**
   - Sanitize all user inputs to ViVi AI
   - Validate response formats
   - Handle malformed responses gracefully

3. **Rate Limiting:**
   - Implement per-user rate limits
   - Monitor API usage patterns
   - Set up alerting for unusual activity

## Troubleshooting

### Common Issues

1. **ViVi AI Not Responding:**
   - Check API key validity
   - Verify network connectivity
   - Review ViVi AI logs

2. **Slow Response Times:**
   - Implement caching
   - Optimize model loading
   - Add request timeouts

3. **Memory Issues:**
   - Monitor memory usage
   - Implement model cleanup
   - Use streaming responses

## Next Steps

After successful integration:

1. **User Acceptance Testing:**
   - Test with real users
   - Gather feedback on AI responses
   - Iterate on persona accuracy

2. **Performance Monitoring:**
   - Set up monitoring dashboards
   - Track response times
   - Monitor error rates

3. **Continuous Improvement:**
   - Regular model updates
   - Response quality assessment
   - User feedback integration

4. **Scaling Preparation:**
   - Load balancing strategy
   - Database optimization
   - CDN configuration

This guide provides a comprehensive framework for integrating your ViVi AI codebase. The modular structure allows for easy maintenance and updates while maintaining production-grade security and performance standards.