import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Brain, Sparkles, BarChart3, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

import profilesData from '../data/profiles.json';

const ViViAssistant: React.FC = () => {
  const { currentPersona } = useApp();
  const [isThinking, setIsThinking] = useState(false);

  const currentProfile = profilesData.profiles.find(p => p.id === currentPersona);
  const firstName = currentProfile?.name.split(' ')[0] || 'there';

  const viviMessages = [
    `Hey ${firstName}! 🌟 Ready to boost your ${currentProfile?.industry.toLowerCase()} campaigns? I've got some fire ideas brewing!`,
    `${firstName}, your recent campaigns are performing amazingly! Want me to analyze what's working and scale it up? 🚀`,
    `I just spotted some trending opportunities in ${currentProfile?.industry}. Should we capitalize on them? 💡`,
    `${firstName}, I've been crunching the numbers and I think we can increase your ROI by 40%. Want to see my strategy? 📈`
  ];

  const [currentMessage, setCurrentMessage] = useState(viviMessages[0]);

  const handleGenerateCampaign = async () => {
    setIsThinking(true);
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentMessage(viviMessages[Math.floor(Math.random() * viviMessages.length)]);
    setIsThinking(false);
  };

  const handleAnalyzePerformance = async () => {
    setIsThinking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentMessage(`Great news ${firstName}! Your campaigns are up 23% this month. Here's what I found... 📊`);
    setIsThinking(false);
  };

  return (
    <Card className="vivi-assistant glass-card border-white/20 bg-white/10 draggable-card">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center vivi-pulse"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-white font-semibold">ViVi AI Assistant</h3>
            <p className="text-white/60 text-sm font-normal">Your marketing genius</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-3 min-h-[60px] flex items-center"
        >
          {isThinking ? (
            <div className="flex items-center space-x-2">
              <motion.div
                className="flex space-x-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-sunset-orange rounded-full" />
                <div className="w-2 h-2 bg-golden-yellow rounded-full" />
                <div className="w-2 h-2 bg-teal-accent rounded-full" />
              </motion.div>
              <p className="text-white/80 text-sm">ViVi is thinking...</p>
            </div>
          ) : (
            <p className="text-white text-sm leading-relaxed">{currentMessage}</p>
          )}
        </motion.div>

        <div className="flex space-x-2">
          <Button
            onClick={handleGenerateCampaign}
            disabled={isThinking}
            className="flex-1 bg-sunset-orange/20 hover:bg-sunset-orange/30 text-white text-sm py-2 px-3 rounded-lg transition-all border border-sunset-orange/30"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Generate Campaign
          </Button>
          <Button
            onClick={handleAnalyzePerformance}
            disabled={isThinking}
            className="flex-1 bg-teal-accent/20 hover:bg-teal-accent/30 text-white text-sm py-2 px-3 rounded-lg transition-all border border-teal-accent/30"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Analyze Performance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViViAssistant;
