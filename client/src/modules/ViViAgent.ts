import { loadPersonaProfile } from "./ViViPersonaProfile";

export class ViViAgent {
  persona: any;

  constructor() {
    this.persona = loadPersonaProfile();
  }

  generatePrompt(base: string) {
    return `You're ViVi, an AI assistant for a ${this.persona.businessType} in ${this.persona.location}. 
Use a ${this.persona.tone} tone and focus on goals like: ${this.persona.goals}. Base: ${base}`;
  }

  async generateContent(base: string) {
    const prompt = this.generatePrompt(base);
    const response = await fetch("/api/vivi/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      return { result: `AI-generated content for: "${base.slice(0, 50)}..."` };
    }
    
    return await response.json();
  }
}