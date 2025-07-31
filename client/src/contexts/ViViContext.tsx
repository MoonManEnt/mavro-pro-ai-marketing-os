import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export interface ViViAgent {
  persona?: string;
  location?: string;
  generateContent(input: string, type: string, platform?: string): Promise<string>;
  chatWithViVi(message: string, currentPage?: string): Promise<any>;
  analyzeCampaign(campaignData: any, timeframe?: string): Promise<any>;
  getTrends(): Promise<any>;
  buildPrompt(input: string, type: string): string;
}

export class ViViAgentClass implements ViViAgent {
  public persona?: string;
  public location?: string;

  constructor(userPersona?: string, locationData?: string) {
    this.persona = userPersona;
    this.location = locationData;
  }

  async generateContent(input: string, type: string, platform: string = 'instagram'): Promise<string> {
    try {
      const response = await fetch("/api/vivi/generate-content", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          prompt: input, 
          persona: this.persona,
          platform: platform,
          contentType: type,
          tone: 'professional',
          length: 'medium'
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.content || "Content generated successfully";
    } catch (error) {
      console.error("ViVi content generation error:", error);
      return `Generated ${type} content for: ${input}`;
    }
  }

  async chatWithViVi(message: string, currentPage?: string): Promise<any> {
    try {
      const response = await fetch("/api/vivi/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          message,
          context: {
            persona: this.persona,
            currentPage
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("ViVi chat error:", error);
      return {
        message: "I'm having trouble connecting right now. Please try again in a moment.",
        suggestions: [],
        actionItems: []
      };
    }
  }

  async analyzeCampaign(campaignData: any, timeframe: string = '30d'): Promise<any> {
    try {
      const response = await fetch("/api/vivi/analyze-campaign", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          campaignData,
          persona: this.persona,
          timeframe
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error("ViVi campaign analysis error:", error);
      return {
        performance: { reach: 0, engagement: '0%', conversions: 0, roi: '0%' },
        recommendations: [],
        trends: [],
        nextSteps: []
      };
    }
  }

  async getTrends(): Promise<any> {
    try {
      const response = await fetch(`/api/vivi/trends/${this.persona}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.trends;
    } catch (error) {
      console.error("ViVi trends error:", error);
      return [];
    }
  }

  buildPrompt(input: string, type: string): string {
    const personaText = this.persona || "business owner";
    const locationText = this.location || "your area";
    return `You are ViVi, a marketing AI assistant for a ${personaText} in ${locationText}. Generate a ${type} for: ${input}`;
  }
}

interface ViViContextType {
  vivi: ViViAgent;
  updatePersona: (persona: string) => void;
  updateLocation: (location: string) => void;
}

const ViViContext = createContext<ViViContextType | null>(null);

interface ViViProviderProps {
  children: ReactNode;
}

export const ViViProvider: React.FC<ViViProviderProps> = ({ children }) => {
  const [vivi, setVivi] = useState<ViViAgent>(
    new ViViAgentClass("business", "your area")
  );

  const updatePersona = (persona: string) => {
    setVivi(new ViViAgentClass(persona, vivi.location));
  };

  const updateLocation = (location: string) => {
    setVivi(new ViViAgentClass(vivi.persona, location));
  };

  const contextValue: ViViContextType = {
    vivi,
    updatePersona,
    updateLocation
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
    throw new Error("useViVi must be used within a ViViProvider");
  }
  return context;
};