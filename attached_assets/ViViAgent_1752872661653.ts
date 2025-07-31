
export class ViViAgent {
  constructor(userPersona, locationData) {
    this.persona = userPersona;
    this.location = locationData;
  }

  async generateContent(input: string, type: string): Promise<string> {
    const prompt = this.buildPrompt(input, type);
    const response = await fetch("/api/vivi/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.text;
  }

  buildPrompt(input: string, type: string): string {
    return \`You are ViVi, a marketing AI for a \${this.persona} in \${this.location}. Generate a \${type} for: \${input}\`;
  }
}
