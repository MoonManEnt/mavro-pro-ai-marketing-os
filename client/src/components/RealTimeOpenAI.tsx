import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Sparkles, Send, Copy, RefreshCw, Wand2 } from "lucide-react";
import { useUserAnalytics } from "./UserAnalytics";

interface ContentGenerationRequest {
  prompt: string;
  persona: string;
  platform: string;
  contentType: 'caption' | 'hook' | 'cta' | 'story';
  tone?: 'professional' | 'casual' | 'enthusiastic' | 'creative';
  length?: 'short' | 'medium' | 'long';
}

interface RealTimeOpenAIProps {
  persona: string;
  onContentGenerated?: (content: string) => void;
}

export function RealTimeOpenAI({ persona, onContentGenerated }: RealTimeOpenAIProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [contentType, setContentType] = useState<'caption' | 'hook' | 'cta' | 'story'>('caption');
  const [tone, setTone] = useState<'professional' | 'casual' | 'enthusiastic' | 'creative'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const { toast } = useToast();
  const analytics = useUserAnalytics();

  const generateContent = useMutation({
    mutationFn: async (request: ContentGenerationRequest) => {
      analytics.viviInteraction('content_generation_start', true);
      const startTime = performance.now();
      
      try {
        const response = await apiRequest('/api/vivi/generate-content', {
          method: 'POST',
          body: JSON.stringify(request),
        });
        
        const endTime = performance.now();
        analytics.contentGenerated(request.platform, request.contentType, true);
        console.log(`🤖 OpenAI generation took ${(endTime - startTime).toFixed(2)}ms`);
        
        return response;
      } catch (error) {
        analytics.contentGenerated(request.platform, request.contentType, false);
        analytics.errorOccurred('openai_generation_failed', error.message, 'RealTimeOpenAI');
        throw error;
      }
    },
    onSuccess: (response) => {
      setGeneratedContent(response.content || response.message || 'Generated content successfully');
      onContentGenerated?.(response.content || response.message || '');
      toast({
        title: "Content Generated!",
        description: "Your AI-powered content is ready to use.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "We couldn't generate content right now. Please try again.",
        variant: "destructive",
      });
      console.error('Content generation error:', error);
    },
  });

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please provide a prompt for content generation.",
        variant: "destructive",
      });
      return;
    }

    const request: ContentGenerationRequest = {
      prompt: prompt.trim(),
      persona,
      platform: selectedPlatform,
      contentType,
      tone,
      length,
    };

    generateContent.mutate(request);
  }, [prompt, persona, selectedPlatform, contentType, tone, length, generateContent, toast]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedContent);
    analytics.featureUsed('copy_generated_content', { contentType, platform: selectedPlatform });
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
      variant: "default",
    });
  }, [generatedContent, analytics, contentType, selectedPlatform, toast]);

  const platforms = [
    { value: 'instagram', label: 'Instagram', limit: 2200 },
    { value: 'linkedin', label: 'LinkedIn', limit: 3000 },
    { value: 'twitter', label: 'X (Twitter)', limit: 280 },
    { value: 'tiktok', label: 'TikTok', limit: 4000 },
    { value: 'facebook', label: 'Facebook', limit: 63206 },
    { value: 'youtube', label: 'YouTube', limit: 5000 },
  ];

  const contentTypes = [
    { value: 'caption' as const, label: 'Caption', description: 'Main post content' },
    { value: 'hook' as const, label: 'Hook', description: 'Attention-grabbing opener' },
    { value: 'cta' as const, label: 'Call to Action', description: 'Drive engagement' },
    { value: 'story' as const, label: 'Story', description: 'Narrative content' },
  ];

  const tones = [
    { value: 'professional' as const, label: 'Professional' },
    { value: 'casual' as const, label: 'Casual' },
    { value: 'enthusiastic' as const, label: 'Enthusiastic' },
    { value: 'creative' as const, label: 'Creative' },
  ];

  const lengths = [
    { value: 'short' as const, label: 'Short' },
    { value: 'medium' as const, label: 'Medium' },
    { value: 'long' as const, label: 'Long' },
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Wand2 className="w-5 h-5 text-purple-400" />
          <span>ViVi AI Content Generator</span>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
            Powered by OpenAI GPT-4o
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Configuration Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Platform</label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Content Type</label>
            <Select value={contentType} onValueChange={(value) => setContentType(value as any)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Tone</label>
            <Select value={tone} onValueChange={(value) => setTone(value as any)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tones.map((toneOption) => (
                  <SelectItem key={toneOption.value} value={toneOption.value}>
                    {toneOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Length</label>
            <Select value={length} onValueChange={(value) => setLength(value as any)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lengths.map((lengthOption) => (
                  <SelectItem key={lengthOption.value} value={lengthOption.value}>
                    {lengthOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Content Prompt
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create... e.g., 'A motivational post about overcoming challenges in business'"
            className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={generateContent.isPending || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          {generateContent.isPending ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {/* Generated Content */}
        {generatedContent && (
          <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-300">Generated Content</h4>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerate}
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
              </div>
            </div>
            
            <div className="text-white text-sm leading-relaxed whitespace-pre-wrap">
              {generatedContent}
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span>Character count: {generatedContent.length}</span>
              <span>
                Platform limit: {platforms.find(p => p.value === selectedPlatform)?.limit || 'N/A'}
              </span>
              {generatedContent.length > (platforms.find(p => p.value === selectedPlatform)?.limit || Infinity) && (
                <Badge variant="destructive" className="text-xs">
                  Over limit
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Quick Suggestions */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Quick Prompts</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Create an engaging post about industry trends",
              "Write a motivational Monday message",
              "Generate a behind-the-scenes content idea",
              "Create a customer success story post"
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(suggestion)}
                className="bg-white/5 hover:bg-white/10 border-white/20 text-gray-300 text-left justify-start h-auto py-2 px-3"
              >
                <Send className="w-3 h-3 mr-2 flex-shrink-0" />
                <span className="text-xs">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}