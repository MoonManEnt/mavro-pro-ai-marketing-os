import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Wand2, 
  TrendingUp, 
  BarChart3, 
  Target,
  Zap,
  Brain,
  Lightbulb,
  Star,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'vivi';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actionButtons?: { label: string; action: string }[];
}

interface ViViEngineProps {
  currentPersona?: string;
  voiceEnabled?: boolean;
  onVoiceToggle?: (enabled: boolean) => void;
  onActionTrigger?: (action: string) => void;
}

const ViViEngine: React.FC<ViViEngineProps> = ({
  currentPersona = 'karen',
  voiceEnabled = true,
  onVoiceToggle,
  onActionTrigger
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'vivi',
      content: getPersonaWelcome(),
      timestamp: new Date(),
      suggestions: [
        "Create a new campaign",
        "Analyze my performance",
        "Schedule content",
        "Find trending topics"
      ],
      actionButtons: [
        { label: "🔥 Let's Make Magic", action: "launch_wizard" },
        { label: "📊 Show Analytics", action: "show_analytics" }
      ]
    };
    setMessages([welcomeMessage]);
  }, [currentPersona]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPersonaWelcome = () => {
    const welcomes = {
      karen: "Hey Karen! I see luxury real estate is hot right now. Want me to create a campaign targeting high-end buyers in your area?",
      sarah: "Hi Sarah! MedSpa trends show anti-aging treatments are surging. Ready to capitalize on this with a targeted campaign?",
      marco: "Ciao Marco! Italian cuisine is trending on social media. Let's create content that showcases your authentic dishes!"
    };
    return welcomes[currentPersona as keyof typeof welcomes] || "Hello! I'm ViVi, your AI marketing assistant. How can I help you grow your business today?";
  };

  const generateViViResponse = (userMessage: string): ChatMessage => {
    const responses = [
      {
        content: "I've analyzed your market and found 3 high-impact opportunities. Should I create campaigns for them?",
        suggestions: ["Yes, create campaigns", "Show me the opportunities first", "Focus on the best one"],
        actionButtons: [
          { label: "Create All 3", action: "create_campaigns" },
          { label: "Show Details", action: "show_opportunities" }
        ]
      },
      {
        content: "Your competitor analysis shows they're missing social media optimization. We can gain 40% more engagement with strategic posting.",
        suggestions: ["Optimize my posting schedule", "Show competitor analysis", "Create better content"],
        actionButtons: [
          { label: "Optimize Now", action: "optimize_schedule" },
          { label: "View Analysis", action: "show_analysis" }
        ]
      },
      {
        content: "I've identified trending keywords that could boost your visibility by 60%. Want me to integrate them into your content?",
        suggestions: ["Yes, integrate keywords", "Show me the keywords", "Create new content"],
        actionButtons: [
          { label: "Integrate Keywords", action: "integrate_keywords" },
          { label: "Create Content", action: "create_content" }
        ]
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now().toString(),
      type: 'vivi',
      content: randomResponse.content,
      timestamp: new Date(),
      suggestions: randomResponse.suggestions,
      actionButtons: randomResponse.actionButtons
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use real ViVi API
      const response = await fetch('/api/vivi/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: currentMessage,
          context: {
            persona: selectedPersona,
            currentPage: 'dashboard'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get ViVi response');
      }

      const data = await response.json();
      const viviResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'vivi',
        content: data.response.message,
        timestamp: new Date(),
        suggestions: data.response.suggestions,
        actionItems: data.response.actionItems
      };

      setMessages(prev => [...prev, viviResponse]);
    } catch (error) {
      console.error('ViVi chat error:', error);
      // Fallback to local response if API fails
      const viviResponse = generateViViResponse(currentMessage);
      setMessages(prev => [...prev, viviResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleActionClick = (action: string) => {
    onActionTrigger?.(action);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    onVoiceToggle?.(!voiceEnabled);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-96 h-96 mavro-card p-0 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b6b] to-[#ff8e8e] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">ViVi Assistant</h3>
                  <p className="text-xs text-white/60">AI Marketing CMO</p>
                </div>
              </div>
              <button
                onClick={handleVoiceToggle}
                className={`p-2 rounded-full transition-colors ${
                  voiceEnabled 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white/60'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-[#ff6b6b] text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    {message.actionButtons && (
                      <div className="mt-3 space-y-2">
                        {message.actionButtons.map((button, index) => (
                          <button
                            key={index}
                            onClick={() => handleActionClick(button.action)}
                            className="block w-full text-left text-xs bg-[#ff6b6b] hover:bg-[#ff5252] px-2 py-1 rounded transition-colors text-white font-medium"
                          >
                            {button.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask ViVi anything..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#ff6b6b]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-[#ff6b6b] hover:bg-[#ff5252] disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-br from-[#ff6b6b] to-[#ff8e8e] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Voice Wave Animation */}
      {voiceEnabled && isListening && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="voice-wave">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViViEngine;