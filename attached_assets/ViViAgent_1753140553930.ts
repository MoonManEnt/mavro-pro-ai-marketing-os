
import { loadPersonaProfile } from "../modules/ViViPersonaProfile";

export class ViViAgent {
  constructor() {
    this.persona = loadPersonaProfile();
  }

  generatePrompt(base) {
    return \`You're ViVi, an AI assistant for a \${this.persona.businessType} in \${this.persona.location}. 
Use a \${this.persona.tone} tone and focus on goals like: \${this.persona.goals}. Base: \${base}\`;
  }

  async generateContent(base) {
    const prompt = this.generatePrompt(base);
    const response = await fetch("/api/vivi/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    return await response.json();
  }
}
