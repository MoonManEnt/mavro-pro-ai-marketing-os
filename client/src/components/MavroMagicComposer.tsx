import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Wand2, Sparkles, Image, Video, Mail, Instagram, Facebook, Twitter, Send, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from '../contexts/AppContext';

interface ContentSuggestion {
  id: string;
  type: 'post' | 'video' | 'email' | 'ad';
  platform: string;
  title: string;
  content: string;
  tone: string;
  tags: string[];
}

const MavroMagicComposer: React.FC = () => {
  const { currentPersona } = useApp();
  const [selectedType, setSelectedType] = useState<'post' | 'video' | 'email' | 'ad'>('post');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const contentTypes = [
    { id: 'post', label: 'Social Post', icon: Image },
    { id: 'video', label: 'Video Script', icon: Video },
    { id: 'email', label: 'Email Campaign', icon: Mail },
    { id: 'ad', label: 'Ad Copy', icon: Zap }
  ];

  const platforms = [
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'facebook', label: 'Facebook', icon: Facebook },
    { id: 'twitter', label: 'Twitter', icon: Twitter },
    { id: 'email', label: 'Email', icon: Mail }
  ];

  const suggestions: ContentSuggestion[] = [
    {
      id: 'sug-1',
      type: 'post',
      platform: 'instagram',
      title: 'New Year Transformation Post',
      content: '✨ New Year, New You! Start 2025 with confidence. Book your consultation today and discover how our treatments can help you achieve your goals. Limited time offer - 20% off first treatment! #NewYearNewYou #Confidence #MedSpa',
      tone: 'inspirational',
      tags: ['new-year', 'transformation', 'confidence']
    },
    {
      id: 'sug-2',
      type: 'video',
      platform: 'instagram',
      title: 'Client Success Story',
      content: 'HOOK: "I never thought I\'d feel this confident again..."\n\nShow before/after transformation\nClient testimonial about experience\nCall to action for consultations\n\nEnd with: "Your transformation starts here"',
      tone: 'authentic',
      tags: ['testimonial', 'before-after', 'success']
    },
    {
      id: 'sug-3',
      type: 'email',
      platform: 'email',
      title: 'Valentine\'s Day Special',
      content: 'Subject: Fall in Love with Your Reflection 💕\n\nHi [Name],\n\nValentine\'s Day is approaching, and what better way to celebrate than by giving yourself the gift of confidence?\n\nOur Valentine\'s special includes:\n• 25% off all treatments\n• Complimentary consultation\n• Gift certificates available\n\nBook now and feel amazing for your special day!\n\nWith love,\nThe Radiant MedSpa Team',
      tone: 'romantic',
      tags: ['valentines', 'special-offer', 'self-love']
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const templates = {
      post: `🌟 ${prompt}\n\nExperience the difference at our ${currentPersona === 'sarah' ? 'premier MedSpa' : currentPersona === 'marco' ? 'authentic Italian restaurant' : 'state-of-the-art fitness center'}! \n\nBook your ${currentPersona === 'sarah' ? 'consultation' : currentPersona === 'marco' ? 'reservation' : 'training session'} today and discover what makes us special.\n\n#${currentPersona === 'sarah' ? 'MedSpa' : currentPersona === 'marco' ? 'ItalianFood' : 'Fitness'} #Excellence #BookNow`,
      video: `HOOK: "${prompt}"\n\n[Scene 1: Problem]\nShow the challenge your audience faces\n\n[Scene 2: Solution]\nDemonstrate your service/product\n\n[Scene 3: Result]\nShow the transformation/outcome\n\nCTA: "Ready to experience this for yourself? Book now!"`,
      email: `Subject: ${prompt}\n\nHi [Name],\n\nI wanted to share something exciting with you...\n\n${prompt}\n\nOur ${currentPersona === 'sarah' ? 'expert team' : currentPersona === 'marco' ? 'culinary team' : 'fitness experts'} are ready to help you achieve your goals.\n\nSpecial offer: Book this week and receive 20% off!\n\nBest regards,\nYour ${currentPersona === 'sarah' ? 'MedSpa' : currentPersona === 'marco' ? 'Restaurant' : 'Fitness'} Team`,
      ad: `${prompt}\n\n✨ Experience the difference\n🎯 Proven results\n📞 Book your consultation today\n\nLimited time offer - Don't miss out!\n\nLearn More →`
    };
    
    setGeneratedContent(templates[selectedType]);
    setIsGenerating(false);
  };

  const platformIcon = platforms.find(p => p.id === selectedPlatform)?.icon || Instagram;

  return (
    <Card className="magic-composer glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center">
          <Wand2 className="w-5 h-5 text-teal-accent mr-2" />
          Mavro Magic Composer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(type.id as any)}
              className={`p-3 rounded-lg border transition-all ${
                selectedType === type.id
                  ? 'bg-gradient-to-r from-teal-accent/20 to-sky-blue/20 border-teal-accent/50'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-2">
                <type.icon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">{type.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Platform Selection */}
        <div className="space-y-2">
          <label className="text-white/90 text-sm font-medium">Platform</label>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              {platforms.map((platform) => (
                <SelectItem key={platform.id} value={platform.id}>
                  <div className="flex items-center space-x-2">
                    <platform.icon className="w-4 h-4" />
                    <span>{platform.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="text-white/90 text-sm font-medium">What would you like to create?</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Promote our holiday special with a festive, welcoming tone..."
            className="bg-white/10 border-white/20 text-white placeholder-white/40 min-h-[80px] resize-none"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-teal-accent to-sky-blue hover:from-teal-accent/80 hover:to-sky-blue/80 text-white"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Creating Magic...
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Generated Content</h3>
              <Badge variant="outline" className="text-teal-accent border-teal-accent/30 bg-teal-accent/10">
                {selectedType}
              </Badge>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <pre className="text-white/90 text-sm whitespace-pre-wrap font-sans">
                {generatedContent}
              </pre>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-sunset-orange to-golden-yellow hover:from-sunset-orange/80 hover:to-golden-yellow/80 text-white"
              >
                <Send className="w-4 h-4 mr-1" />
                Use Content
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Regenerate
              </Button>
            </div>
          </motion.div>
        )}

        {/* AI Suggestions */}
        <div className="space-y-3">
          <h3 className="text-white font-medium">AI Suggestions</h3>
          <div className="space-y-2">
            {suggestions.filter(s => s.type === selectedType).slice(0, 3).map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => setPrompt(suggestion.title)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{suggestion.title}</span>
                  <Badge variant="outline" className="text-sky-blue border-sky-blue/30 bg-sky-blue/10 text-xs">
                    {suggestion.tone}
                  </Badge>
                </div>
                <p className="text-white/60 text-xs truncate">{suggestion.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MavroMagicComposer;
