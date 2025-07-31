import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Settings,
  Headphones,
  Waves,
  Brain
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface VoiceSettings {
  voiceEnabled: boolean;
  autoSpeak: boolean;
  voice: string;
  speed: number;
  pitch: number;
}

interface VoiceResponse {
  text: string;
  emotion: 'excited' | 'professional' | 'helpful' | 'confident';
  duration: number;
}

const ViViVoice: React.FC = () => {
  const { currentPersona } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    voiceEnabled: true,
    autoSpeak: true,
    voice: 'female-1',
    speed: 1.0,
    pitch: 1.0
  });
  const [currentResponse, setCurrentResponse] = useState<VoiceResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Simulate voice waveform animation
  useEffect(() => {
    if (isListening || isSpeaking) {
      const interval = setInterval(() => {
        setWaveformData(prev => {
          const newData = Array.from({ length: 20 }, () => Math.random() * 100);
          return newData;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveformData(Array.from({ length: 20 }, () => 0));
    }
  }, [isListening, isSpeaking]);

  const voiceOptions = [
    { id: 'female-1', name: 'ViVi Original', description: 'Warm, professional female voice' },
    { id: 'female-2', name: 'ViVi Energetic', description: 'Upbeat, enthusiastic female voice' },
    { id: 'male-1', name: 'ViVi Professional', description: 'Clear, authoritative male voice' },
    { id: 'neural-1', name: 'ViVi Neural', description: 'AI-optimized natural voice' }
  ];

  const startListening = () => {
    setIsListening(true);
    setIsProcessing(false);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing and response
      setTimeout(() => {
        setIsProcessing(false);
        const responses: VoiceResponse[] = [
          {
            text: "Great question! Based on your current campaign performance, I'd recommend boosting your Instagram ads by 30% and shifting 15% of your budget to video content. This could increase your ROI by up to 40%.",
            emotion: 'professional',
            duration: 8
          },
          {
            text: "I'm excited to help you with that! I've analyzed your competitor's strategies and found 3 key opportunities. Would you like me to create a detailed action plan for you?",
            emotion: 'excited',
            duration: 6
          },
          {
            text: "Perfect timing! I just detected a trending topic in your industry. Let me help you create content that could go viral. Shall we start with a quick content brief?",
            emotion: 'helpful',
            duration: 7
          }
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setCurrentResponse(randomResponse);
        
        if (voiceSettings.autoSpeak) {
          speakResponse(randomResponse);
        }
      }, 2000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };

  const speakResponse = (response: VoiceResponse) => {
    setIsSpeaking(true);
    
    // Simulate speech duration
    setTimeout(() => {
      setIsSpeaking(false);
    }, response.duration * 1000);
  };

  const toggleVoice = () => {
    setVoiceSettings(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
  };

  const toggleAutoSpeak = () => {
    setVoiceSettings(prev => ({ ...prev, autoSpeak: !prev.autoSpeak }));
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'excited': return 'from-sunset-orange to-golden-yellow';
      case 'professional': return 'from-sky-blue to-teal-accent';
      case 'helpful': return 'from-mint-green to-teal-accent';
      case 'confident': return 'from-golden-yellow to-sunset-orange';
      default: return 'from-sunset-orange to-golden-yellow';
    }
  };

  const getPersonaVoicePrompt = () => {
    switch (currentPersona) {
      case 'sarah':
        return "Hi! I'm ViVi, your AI marketing assistant for MedSpa businesses. I understand beauty, wellness, and anti-aging marketing strategies.";
      case 'marco':
        return "Ciao! I'm ViVi, your AI marketing assistant for restaurants. I know food, hospitality, and culinary marketing inside and out.";
      case 'alex':
        return "Hey there! I'm ViVi, your AI marketing assistant for fitness businesses. I'm here to help you grow your gym and personal training services.";
      default:
        return "Hi! I'm ViVi, your AI marketing assistant. I'm here to help you grow your business with smart marketing strategies.";
    }
  };

  return (
    <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">ViVi Voice</h3>
              <p className="text-white/60 text-xs">AI Voice Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={voiceSettings.voiceEnabled ? "default" : "outline"}
              className={voiceSettings.voiceEnabled ? "bg-mint-green text-white" : "text-white/60"}
            >
              {voiceSettings.voiceEnabled ? "ON" : "OFF"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white/60 hover:text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Voice Control</span>
                  <button
                    onClick={toggleVoice}
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${
                      voiceSettings.voiceEnabled ? 'bg-mint-green' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      voiceSettings.voiceEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Auto-Speak Responses</span>
                  <button
                    onClick={toggleAutoSpeak}
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${
                      voiceSettings.autoSpeak ? 'bg-mint-green' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      voiceSettings.autoSpeak ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
                
                <div>
                  <span className="text-white/80 text-sm">Voice Selection</span>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {voiceOptions.map((voice) => (
                      <button
                        key={voice.id}
                        onClick={() => setVoiceSettings(prev => ({ ...prev, voice: voice.id }))}
                        className={`p-2 rounded-lg text-left transition-all ${
                          voiceSettings.voice === voice.id
                            ? 'bg-sunset-orange text-white'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <div className="font-medium text-sm">{voice.name}</div>
                        <div className="text-xs opacity-70">{voice.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Waveform Visualization */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-end space-x-1 h-16">
            {waveformData.map((height, index) => (
              <motion.div
                key={index}
                className={`w-1 bg-gradient-to-t ${
                  isListening 
                    ? 'from-sunset-orange to-golden-yellow' 
                    : isSpeaking 
                    ? 'from-mint-green to-teal-accent'
                    : 'from-white/20 to-white/40'
                }`}
                animate={{ height: `${Math.max(height, 5)}%` }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Main Voice Controls */}
        <div className="space-y-4">
          <div className="text-center">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center">
                  <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                </div>
                <p className="text-white/80 text-sm">Processing your request...</p>
              </div>
            ) : isListening ? (
              <div className="space-y-2">
                <button
                  onClick={stopListening}
                  className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
                >
                  <MicOff className="w-8 h-8 text-white" />
                </button>
                <p className="text-white/80 text-sm">Listening... Tap to stop</p>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={startListening}
                  disabled={!voiceSettings.voiceEnabled}
                  className="w-16 h-16 bg-gradient-to-r from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center hover:from-sunset-orange/80 hover:to-golden-yellow/80 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mic className="w-8 h-8 text-white" />
                </button>
                <p className="text-white/80 text-sm">
                  {voiceSettings.voiceEnabled ? "Tap to speak with ViVi" : "Enable voice to continue"}
                </p>
              </div>
            )}
          </div>

          {/* Current Response */}
          {currentResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg bg-gradient-to-r ${getEmotionColor(currentResponse.emotion)} bg-opacity-20 border border-white/10`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Headphones className="w-4 h-4 text-white" />
                  <span className="text-white/80 text-sm font-medium">ViVi Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isSpeaking && (
                    <div className="flex items-center space-x-1">
                      <Waves className="w-4 h-4 text-mint-green animate-pulse" />
                      <span className="text-mint-green text-xs">Speaking...</span>
                    </div>
                  )}
                  <button
                    onClick={() => speakResponse(currentResponse)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {isSpeaking ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {currentResponse.text}
              </p>
            </motion.div>
          )}

          {/* Persona Introduction */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-teal-accent to-mint-green rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
              <span className="text-white/80 text-sm">Quick Tip</span>
            </div>
            <p className="text-white/70 text-xs">
              {getPersonaVoicePrompt()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViViVoice;