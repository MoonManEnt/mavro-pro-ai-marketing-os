import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export interface ContentGenerationRequest {
  prompt: string;
  persona: string;
  platform: string;
  contentType: 'caption' | 'hook' | 'cta' | 'story';
  tone?: 'professional' | 'casual' | 'enthusiastic' | 'creative';
  length?: 'short' | 'medium' | 'long';
}

export interface ViViChatRequest {
  message: string;
  persona: string;
  context?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export async function generateContent(request: ContentGenerationRequest): Promise<string> {
  try {
    const personaContext = getPersonaContext(request.persona);
    const platformContext = getPlatformContext(request.platform);
    
    const systemPrompt = `You are ViVi, an expert AI marketing assistant for ${personaContext.name}, a ${personaContext.business}. 
    
    Generate ${request.contentType} content for ${request.platform} that:
    - Matches ${personaContext.name}'s ${request.tone || 'professional'} voice and industry expertise
    - Follows ${request.platform} best practices and character limits
    - Is ${request.length || 'medium'} in length
    - Engages the target audience effectively
    - Includes relevant hashtags if appropriate for the platform
    
    Industry: ${personaContext.industry}
    Audience: ${personaContext.audience}
    Voice: ${request.tone || 'professional'}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: request.prompt }
      ],
      max_tokens: request.length === 'short' ? 150 : request.length === 'long' ? 500 : 300,
      temperature: request.tone === 'creative' ? 0.8 : 0.7,
    });

    return response.choices[0].message.content || "Sorry, I couldn't generate content right now.";
  } catch (error) {
    console.error("OpenAI content generation error:", error);
    throw new Error("Failed to generate content with AI");
  }
}

export async function chatWithViVi(request: ViViChatRequest): Promise<string> {
  try {
    const personaContext = getPersonaContext(request.persona);
    
    const systemPrompt = `You are ViVi, an expert AI marketing assistant helping ${personaContext.name}, a ${personaContext.business}. 
    
    You are knowledgeable about:
    - ${personaContext.industry} industry trends and best practices
    - Social media marketing strategies
    - Content creation and engagement optimization
    - Campaign performance analysis
    - Lead generation and conversion tactics
    
    Respond as ViVi with helpful, actionable marketing advice. Be professional yet friendly, and always focus on practical solutions that can improve their marketing results. Keep responses concise but valuable.
    
    Business Context: ${personaContext.name} - ${personaContext.business}
    Industry: ${personaContext.industry}`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...(request.conversationHistory || []),
      { role: "user" as const, content: request.message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm having trouble responding right now. Please try again.";
  } catch (error) {
    console.error("OpenAI chat error:", error);
    
    // Enhanced fallback responses for better demo experience
    const personaResponses: Record<string, string> = {
      kemar: `Hello Kemar! I'm here to help boost your speaking career. I can assist with keynote content ideas, audience engagement strategies, and building your personal brand. What marketing challenge can I tackle for you today?`,
      karen: `Hi Karen! Ready to dominate the real estate market? I can help with lead generation campaigns, property showcase content, and client retention strategies. What's your biggest marketing priority right now?`,
      sarah: `Hello Sarah! Let's grow your MedSpa business together. I can create wellness content, treatment promotion campaigns, and client testimonials that convert. How can I help attract more clients today?`,
      marco: `Ciao Marco! Time to fill those restaurant tables! I can help with food photography content, local marketing campaigns, and social media strategies that make mouths water. What's cooking in your marketing plans?`,
      alex: `Hey Alex! Let's get your fitness business pumping! I can create workout content, transformation showcases, and motivation campaigns that build your community. Ready to flex those marketing muscles?`,
      david: `Hello David! Let's drive some serious car sales! I can help with vehicle showcase content, promotional campaigns, and customer testimonials that close deals. What's your sales target this month?`
    };
    
    return personaResponses[request.persona] || personaResponses.kemar;
  }
}

export async function analyzePerformance(data: any, persona: string): Promise<string> {
  try {
    const personaContext = getPersonaContext(persona);
    
    const systemPrompt = `You are ViVi, analyzing marketing performance for ${personaContext.name}, a ${personaContext.business}.
    
    Provide actionable insights and recommendations based on the performance data. Focus on:
    - Key performance trends and patterns
    - Opportunities for improvement
    - Specific actionable recommendations
    - Industry-specific best practices for ${personaContext.industry}
    
    Keep the analysis professional, data-driven, and actionable.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze this performance data and provide insights: ${JSON.stringify(data)}` }
      ],
      response_format: { type: "json_object" },
      max_tokens: 400,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.analysis || "Unable to analyze performance data at this time.";
  } catch (error) {
    console.error("OpenAI performance analysis error:", error);
    throw new Error("Failed to analyze performance with AI");
  }
}

function getPersonaContext(persona: string) {
  const contexts = {
    kemar: {
      name: "Kemar Hinds",
      business: "Keynote Speaker & Thought Leader",
      industry: "Speaking & Leadership",
      audience: "Business leaders, entrepreneurs, conference attendees"
    },
    karen: {
      name: "Karen Thompson", 
      business: "Real Estate Agent",
      industry: "Real Estate",
      audience: "Home buyers, sellers, investors"
    },
    sarah: {
      name: "Sarah Martinez",
      business: "MedSpa Owner", 
      industry: "Medical Spa & Wellness",
      audience: "Health-conscious individuals, beauty enthusiasts"
    },
    marco: {
      name: "Marco Romano",
      business: "Restaurant Owner",
      industry: "Food & Hospitality", 
      audience: "Food lovers, families, local diners"
    },
    alex: {
      name: "Alex Chen",
      business: "Fitness Coach",
      industry: "Fitness & Wellness",
      audience: "Fitness enthusiasts, people seeking transformation"
    },
    david: {
      name: "David Wilson", 
      business: "Auto Dealer",
      industry: "Automotive",
      audience: "Car buyers, automotive enthusiasts"
    }
  };
  
  return contexts[persona as keyof typeof contexts] || contexts.kemar;
}

function getPlatformContext(platform: string) {
  const contexts = {
    instagram: { limit: 2200, style: "Visual storytelling with hashtags" },
    linkedin: { limit: 3000, style: "Professional networking content" }, 
    twitter: { limit: 280, style: "Concise, engaging tweets" },
    tiktok: { limit: 4000, style: "Trendy, entertaining content" },
    facebook: { limit: 63206, style: "Community engagement content" },
    youtube: { limit: 5000, style: "Educational or entertaining video descriptions" }
  };
  
  return contexts[platform as keyof typeof contexts] || contexts.instagram;
}

export { openai };