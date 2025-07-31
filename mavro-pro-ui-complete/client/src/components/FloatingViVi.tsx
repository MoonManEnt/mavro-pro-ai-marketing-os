import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Brain, MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

import profilesData from '../data/profiles.json';

interface ChatMessage {
  id: string;
  type: 'user' | 'vivi';
  content: string;
  timestamp: Date;
}

const FloatingViVi: React.FC = () => {
  const { currentPersona } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentProfile = profilesData.profiles.find(p => p.id === currentPersona);
  const firstName = currentProfile?.name.split(' ')[0] || 'there';

  const viviResponses = [
    `Hey ${firstName}! I'm here to help you dominate your marketing game. What would you like to achieve today? 🚀`,
    `Great question! Based on your ${currentProfile?.industry} data, I'd recommend focusing on your top-performing campaigns first. Want me to show you the numbers? 📊`,
    `I love your energy! Let's create some marketing magic together. What's your biggest challenge right now? ✨`,
    `Perfect timing! I just analyzed your latest campaign performance and found some golden opportunities. Ready to scale up? 💰`,
    `You're on fire! That's exactly the kind of strategic thinking that drives results. Let me help you optimize this further. 🔥`
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate ViVi thinking and responding
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const viviResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'vivi',
      content: viviResponses[Math.floor(Math.random() * viviResponses.length)],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, viviResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when first opened
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'vivi',
        content: `Hello ${firstName}! 👋 I'm ViVi, your AI marketing assistant. I'm here to help you boost your ${currentProfile?.industry.toLowerCase()} business. What can I help you with today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 w-80 z-50"
          >
            <Card className="glass-card border-white/20 bg-black/80 backdrop-blur-lg shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white font-semibold flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-sm">ViVi Assistant</span>
                      <p className="text-xs text-white/60">Online</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChat}
                    className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-sunset-orange to-golden-yellow text-white' 
                          : 'bg-white/10 text-white border border-white/20'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 border border-white/20 p-3 rounded-lg">
                        <motion.div
                          className="flex space-x-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-sunset-orange rounded-full" />
                          <div className="w-2 h-2 bg-golden-yellow rounded-full" />
                          <div className="w-2 h-2 bg-teal-accent rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask ViVi anything..."
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/40"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-sunset-orange to-golden-yellow hover:from-sunset-orange/80 hover:to-golden-yellow/80 text-white p-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          className="floating-vivi w-14 h-14 bg-gradient-to-br from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all vivi-pulse"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </motion.div>
    </>
  );
};

export default FloatingViVi;
