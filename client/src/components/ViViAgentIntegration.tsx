import React, { createContext, useContext, useState, useCallback } from "react";
import { useUserAnalytics } from "./UserAnalytics";
import { apiRequest } from "@/lib/queryClient";

// Enhanced ViVi Agent based on provided codebase but modernized
export class EnhancedViViAgent {
  private persona: string;
  private location: string;
  private analytics: any;

  constructor(userPersona: string, locationData: string, analytics: any) {
    this.persona = userPersona;
    this.location = locationData;
    this.analytics = analytics;
  }

  async generateContent(input: string, type: string, platform?: string): Promise<string> {
    const startTime = performance.now();
    
    try {
      this.analytics?.viviInteraction('content_generation_start', true);
      
      const prompt = this.buildPrompt(input, type, platform);
      
      // Use our modern API endpoint
      const response = await apiRequest('/api/vivi/generate-content', {
        method: 'POST',
        body: JSON.stringify({
          prompt: input,
          persona: this.persona,
          platform: platform || 'instagram',
          contentType: type,
          tone: 'professional',
          length: 'medium'
        }),
      });

      const endTime = performance.now();
      this.analytics?.contentGenerated(platform || 'general', type, true);
      
      console.log(`✨ ViVi generation took ${(endTime - startTime).toFixed(2)}ms`);
      
      return response.content || response.message || 'Content generated successfully';
    } catch (error) {
      this.analytics?.contentGenerated(platform || 'general', type, false);
      this.analytics?.errorOccurred('vivi_generation_failed', error.message, 'ViViAgent');
      throw error;
    }
  }

  buildPrompt(input: string, type: string, platform?: string): string {
    const platformContext = platform ? ` for ${platform}` : '';
    const personaContext = this.getPersonaContext();
    
    return `You are ViVi, an AI marketing assistant for ${personaContext} in ${this.location}. 
    Generate a ${type}${platformContext} for: ${input}. 
    Make it engaging, professional, and optimized for the target audience.`;
  }

  private getPersonaContext(): string {
    const personaMap = {
      'kemar': 'a keynote speaker and thought leader',
      'karen': 'a successful real estate agent',
      'sarah': 'a MedSpa owner and wellness expert',
      'marco': 'an Italian restaurant owner and chef',
      'alex': 'a fitness coach and gym owner',
      'david': 'an automotive dealer and sales expert'
    };
    
    return personaMap[this.persona] || 'a business professional';
  }

  async chatWithViVi(message: string, context?: any): Promise<string> {
    try {
      this.analytics?.viviInteraction('chat_start', true);
      
      const response = await apiRequest('/api/vivi/chat', {
        method: 'POST',
        body: JSON.stringify({
          message,
          context: {
            persona: this.persona,
            currentPage: context?.currentPage,
            ...context
          }
        }),
      });

      this.analytics?.viviInteraction('chat_success', true);
      return response.response?.message || response.message || 'Hello! How can I help you today?';
    } catch (error) {
      this.analytics?.viviInteraction('chat_failed', false);
      this.analytics?.errorOccurred('vivi_chat_failed', error.message, 'ViViAgent');
      throw error;
    }
  }

  async analyzePerformance(data: any): Promise<string> {
    try {
      const response = await apiRequest('/api/vivi/analyze-performance', {
        method: 'POST',
        body: JSON.stringify({
          data,
          persona: this.persona
        }),
      });

      return response.analysis || 'Performance analysis completed successfully';
    } catch (error) {
      this.analytics?.errorOccurred('vivi_analysis_failed', error.message, 'ViViAgent');
      throw error;
    }
  }

  // Enhanced scheduling capabilities
  async scheduleContent(content: string, platform: string, scheduledTime: Date): Promise<boolean> {
    try {
      this.analytics?.featureUsed('content_scheduling', { platform, scheduledTime });
      
      // Here we would integrate with actual scheduling system
      console.log(`📅 Scheduling content for ${platform} at ${scheduledTime.toISOString()}`);
      console.log(`Content: ${content}`);
      
      return true;
    } catch (error) {
      this.analytics?.errorOccurred('scheduling_failed', error.message, 'ViViAgent');
      return false;
    }
  }

  getPersona(): string {
    return this.persona;
  }

  getLocation(): string {
    return this.location;
  }

  updatePersona(newPersona: string): void {
    const oldPersona = this.persona;
    this.persona = newPersona;
    this.analytics?.personaSwitch(oldPersona, newPersona);
  }
}

// Enhanced ViVi Context
interface ViViContextType {
  vivi: EnhancedViViAgent | null;
  currentPersona: string;
  isLoading: boolean;
  setPersona: (persona: string) => void;
  generateContent: (input: string, type: string, platform?: string) => Promise<string>;
  chatWithViVi: (message: string, context?: any) => Promise<string>;
  scheduleContent: (content: string, platform: string, scheduledTime: Date) => Promise<boolean>;
}

const ViViContext = createContext<ViViContextType | null>(null);

export const ViViProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPersona, setCurrentPersona] = useState('kemar');
  const [isLoading, setIsLoading] = useState(false);
  const analytics = useUserAnalytics();

  // Initialize ViVi agent with current persona
  const [vivi] = useState(() => 
    new EnhancedViViAgent(currentPersona, 'Austin, TX', analytics)
  );

  const setPersona = useCallback((persona: string) => {
    if (vivi) {
      vivi.updatePersona(persona);
    }
    setCurrentPersona(persona);
  }, [vivi]);

  const generateContent = useCallback(async (input: string, type: string, platform?: string) => {
    if (!vivi) throw new Error('ViVi agent not initialized');
    
    setIsLoading(true);
    try {
      return await vivi.generateContent(input, type, platform);
    } finally {
      setIsLoading(false);
    }
  }, [vivi]);

  const chatWithViVi = useCallback(async (message: string, context?: any) => {
    if (!vivi) throw new Error('ViVi agent not initialized');
    
    setIsLoading(true);
    try {
      return await vivi.chatWithViVi(message, context);
    } finally {
      setIsLoading(false);
    }
  }, [vivi]);

  const scheduleContent = useCallback(async (content: string, platform: string, scheduledTime: Date) => {
    if (!vivi) throw new Error('ViVi agent not initialized');
    
    return await vivi.scheduleContent(content, platform, scheduledTime);
  }, [vivi]);

  const contextValue: ViViContextType = {
    vivi,
    currentPersona,
    isLoading,
    setPersona,
    generateContent,
    chatWithViVi,
    scheduleContent,
  };

  return (
    <ViViContext.Provider value={contextValue}>
      {children}
    </ViViContext.Provider>
  );
};

export const useViVi = (): ViViContextType => {
  const context = useContext(ViViContext);
  if (!context) {
    throw new Error('useViVi must be used within a ViViProvider');
  }
  return context;
};

// Enhanced Post Scheduler based on provided example
export const EnhancedPostScheduler: React.FC = () => {
  const { generateContent, scheduleContent, currentPersona, isLoading } = useViVi();
  const [postScheduled, setPostScheduled] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleSchedulePost = async () => {
    try {
      setPostScheduled(true);
      
      // Generate content based on persona
      const contentPrompt = currentPersona === 'sarah' 
        ? 'Flash Sale on Anti-Aging Facials'
        : currentPersona === 'marco'
        ? 'Special Pasta Night Menu'
        : currentPersona === 'alex'
        ? 'New HIIT Training Class Launch'
        : currentPersona === 'karen'
        ? 'New Luxury Home Listing'
        : currentPersona === 'david'
        ? 'End of Year Car Sale Event'
        : 'Motivational Leadership Quote';

      const content = await generateContent(contentPrompt, 'caption', 'instagram');
      setGeneratedContent(content);
      
      // Schedule for next day at optimal time
      const scheduledTime = new Date();
      scheduledTime.setDate(scheduledTime.getDate() + 1);
      scheduledTime.setHours(12, 0, 0, 0); // 12 PM next day
      
      const success = await scheduleContent(content, 'instagram', scheduledTime);
      
      if (success) {
        console.log('✅ Post scheduled successfully with ViVi AI content');
      }
    } catch (error) {
      console.error('❌ Failed to schedule post:', error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">
        Enhanced ViVi Post Scheduler
      </h3>
      
      <div className="space-y-4">
        <button
          onClick={handleSchedulePost}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors"
        >
          {isLoading ? 'Generating with ViVi...' : 'Schedule AI-Generated Post'}
        </button>
        
        {postScheduled && generatedContent && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-sm font-medium text-gray-300 mb-2">ViVi's Generated Content:</h4>
            <p className="text-white text-sm leading-relaxed">{generatedContent}</p>
            <div className="mt-2 text-xs text-gray-400">
              Scheduled for tomorrow at 12:00 PM • Instagram
            </div>
          </div>
        )}
      </div>
    </div>
  );
};