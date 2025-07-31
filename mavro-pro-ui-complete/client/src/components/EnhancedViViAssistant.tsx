import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Minimize2, Maximize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import ViViLogo from './ViViLogo';

interface EnhancedViViAssistantProps {
  currentPersona: string;
  currentView: string;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'vivi';
  timestamp: Date;
  suggestions?: string[];
}

export default function EnhancedViViAssistant({ 
  currentPersona, 
  currentView, 
  isMinimized, 
  onToggleMinimize 
}: EnhancedViViAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Contextual messages based on persona and view
  const getContextualWelcome = () => {
    const welcomeMessages = {
      kemar: {
        dashboard: "Ready to elevate your speaking business? I can help you create compelling content for your next keynote!",
        campaigns: "Let's optimize your speaking engagement campaigns. I see great potential for corporate training expansion.",
        analytics: "Your speaking metrics are impressive! Want me to identify trends for your next presentation topics?"
      },
      karen: {
        dashboard: "The luxury real estate market is hot! I can help you showcase your premium listings perfectly.",
        campaigns: "Your property marketing campaigns are performing well. Ready to target high-net-worth buyers?",
        analytics: "Market analysis shows strong demand in your area. Let's leverage this for your next listings."
      },
      sarah: {
        dashboard: "Your MedSpa content is resonating beautifully! Ready to create more transformation stories?",
        campaigns: "Anti-aging treatments are trending. I can help you craft content that drives bookings.",
        analytics: "Your client testimonials are powerful. Want to amplify them across all platforms?"
      },
      marco: {
        dashboard: "Authentic Italian cuisine never goes out of style! Let's showcase your culinary mastery.",
        campaigns: "Food lovers are engaging with your content. Ready to promote your catering services?",
        analytics: "Your recipe videos are performing exceptionally. Let's expand your cooking content strategy."
      },
      alex: {
        dashboard: "Fitness transformation content is your strength! Ready to motivate more clients?",
        campaigns: "Home workout demand is high. I can help you create targeted fitness campaigns.",
        analytics: "Your workout videos have amazing engagement. Let's scale your fitness coaching business."
      },
      david: {
        dashboard: "The auto market is evolving rapidly. Let's showcase your expertise in electric vehicles!",
        campaigns: "Luxury vehicle interest is growing. Ready to target premium buyers?",
        analytics: "Your vehicle showcases are driving inquiries. Let's optimize your sales funnel."
      }
    };

    const persona = welcomeMessages[currentPersona as keyof typeof welcomeMessages];
    return persona?.[currentView as keyof typeof persona] || persona?.dashboard || 
           "Hi! I'm ViVi, your AI marketing assistant. How can I help you today?";
  };

  // Initialize with contextual welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: getContextualWelcome(),
      sender: 'vivi',
      timestamp: new Date(),
      suggestions: [
        "Create content ideas",
        "Analyze performance",
        "Optimize campaigns",
        "Schedule posts"
      ]
    };
    setMessages([welcomeMessage]);
  }, [currentPersona, currentView]);

  // Smart response generation
  const generateViViResponse = (userMessage: string): Message => {
    const responses = {
      kemar: [
        "Your speaking expertise shines through! Here are some content ideas that will resonate with executives...",
        "Leadership development is trending. Let me craft some thought-provoking posts for your audience...",
        "Your corporate training approach is unique. I'll help you showcase this differentiator..."
      ],
      karen: [
        "The luxury market loves exclusivity. Here's how to position your premium properties...",
        "High-net-worth buyers respond to these specific triggers. Let me help you craft the perfect message...",
        "Your market expertise is impressive. I'll help you create content that establishes authority..."
      ],
      sarah: [
        "Transformation stories are incredibly powerful. Here's how to showcase your results ethically...",
        "Anti-aging content performs best with these elements. Let me help you create engaging posts...",
        "Your treatment explanations build trust. I'll help you create educational content that converts..."
      ],
      marco: [
        "Authentic Italian cuisine has such rich storytelling potential. Here's how to share your heritage...",
        "Food content performs best with these visual elements. Let me help you create mouth-watering posts...",
        "Your culinary expertise deserves recognition. I'll help you build your personal brand..."
      ],
      alex: [
        "Fitness transformations inspire action. Here's how to motivate your audience effectively...",
        "Home workout content is in high demand. Let me help you create accessible fitness routines...",
        "Your coaching approach is motivational. I'll help you scale your impact..."
      ],
      david: [
        "The auto industry is evolving rapidly. Here's how to position yourself as a trusted advisor...",
        "Luxury vehicle buyers have specific needs. Let me help you craft targeted messaging...",
        "Your product knowledge is extensive. I'll help you create educational content that builds trust..."
      ]
    };

    const personaResponses = responses[currentPersona as keyof typeof responses];
    const response = personaResponses[Math.floor(Math.random() * personaResponses.length)];

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'vivi',
      timestamp: new Date(),
      suggestions: [
        "That's perfect!",
        "Show me more",
        "Create this content",
        "Schedule this"
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate ViVi typing and response
    setTimeout(() => {
      setIsTyping(false);
      const viviResponse = generateViViResponse(inputText);
      setMessages(prev => [...prev, viviResponse]);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    handleSendMessage();
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled) {
      setIsListening(false);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  if (isMinimized) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <button
          onClick={onToggleMinimize}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <ViViLogo className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <ViViLogo className="w-8 h-8 text-white" />
          <div>
            <h3 className="font-bold text-white">ViVi Assistant</h3>
            <p className="text-sm text-purple-100">AI Marketing Expert</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-full transition-colors ${
              voiceEnabled ? 'bg-white/20 text-white' : 'text-purple-200 hover:text-white'
            }`}
          >
            {voiceEnabled && isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full transition-colors ${
              audioEnabled ? 'bg-white/20 text-white' : 'text-purple-200 hover:text-white'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onToggleMinimize}
            className="p-2 rounded-full text-purple-200 hover:text-white transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask ViVi anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}