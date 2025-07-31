import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Send, Bot, User, Lightbulb, TrendingUp } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'vivi';
  message: string;
  timestamp: Date;
  suggestions?: string[];
  actionItems?: Array<{
    title: string;
    description: string;
    action: string;
  }>;
  metrics?: {
    confidence: number;
    relevance: number;
    industry_specific: boolean;
  };
}

interface ViViChatProps {
  workspaceId: string;
  industry?: string;
  persona?: string;
  currentPage?: string;
}

export default function ViViChat({ workspaceId, industry, persona, currentPage }: ViViChatProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'vivi',
      message: `Hi! I'm ViVi, your AI marketing assistant. I'm here to help optimize your ${industry || 'business'} campaigns and grow your reach. What would you like to work on today?`,
      timestamp: new Date(),
      suggestions: [
        'Analyze my campaign performance',
        'Generate content ideas',
        'Review competitor strategies',
        'Optimize posting schedule'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const token = localStorage.getItem('accessToken');
      return await apiRequest('/api/vivi/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          workspaceId,
          context: {
            persona,
            industry,
            currentPage,
          },
        }),
      });
    },
    onSuccess: (data) => {
      const viviMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'vivi',
        message: data.response.message,
        timestamp: new Date(),
        suggestions: data.response.suggestions,
        actionItems: data.response.actionItems,
        metrics: data.response.metrics,
      };

      setMessages(prev => [...prev, viviMessage]);
    },
    onError: (error: any) => {
      toast({
        title: 'Chat Error',
        description: error.message || 'Failed to send message to ViVi',
        variant: 'destructive',
      });
    },
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputMessage);
    setInputMessage('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          ViVi AI Assistant
          {industry && (
            <Badge variant="secondary" className="ml-auto">
              {industry}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-purple-600 text-white'
                }`}>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  
                  {/* ViVi-specific content */}
                  {message.type === 'vivi' && (
                    <>
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-gray-600">Quick Actions:</p>
                          <div className="flex flex-wrap gap-1">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Items */}
                      {message.actionItems && message.actionItems.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-gray-600 flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            Recommended Actions:
                          </p>
                          {message.actionItems.map((action, index) => (
                            <div key={index} className="p-2 bg-white rounded border">
                              <p className="text-xs font-medium">{action.title}</p>
                              <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Metrics */}
                      {message.metrics && (
                        <div className="mt-3 flex items-center gap-2 text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>Confidence: {Math.round(message.metrics.confidence * 100)}%</span>
                          <span>•</span>
                          <span>Relevance: {Math.round(message.metrics.relevance * 100)}%</span>
                          {message.metrics.industry_specific && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs py-0">
                                Industry-Specific
                              </Badge>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {chatMutation.isPending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask ViVi anything about your marketing..."
              className="flex-1"
              disabled={chatMutation.isPending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || chatMutation.isPending}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send • ViVi is powered by advanced AI trained on marketing best practices
          </p>
        </div>
      </CardContent>
    </Card>
  );
}