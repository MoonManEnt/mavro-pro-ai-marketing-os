import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { ArrowRight, Sparkles, Target, BarChart3, TrendingUp, Zap } from 'lucide-react';

import profilesData from '../data/profiles.json';

const DemoLogin: React.FC = () => {
  const [, navigate] = useLocation();
  const { setCurrentPersona, setUser, setShowTour } = useApp();
  const [selectedPersona, setSelectedPersona] = useState<string>('');

  const profiles = profilesData.profiles;

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    const profile = profiles.find(p => p.id === personaId);
    if (profile) {
      setCurrentPersona(personaId);
      setUser({
        id: 1,
        username: personaId,
        email: `${personaId}@demo.com`,
        persona: personaId,
        mode: 'demo'
      });
      setShowTour(true);
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Campaign Planning",
      description: "AI-powered campaign creation tailored to your industry"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track performance and ROI with detailed insights"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Automation",
      description: "Automated content scheduling and optimization"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "ViVi AI Assistant",
      description: "Your personal marketing CMO powered by AI"
    }
  ];

  return (
    <div className="bg-mavro-main min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="mavro-logo text-5xl mb-4">
              Mavro <span>Plus</span>
            </h1>
            <p className="text-xl text-white/80">Marketing OS</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              AI-Powered Marketing That Works
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Experience the future of marketing automation with ViVi, your AI assistant 
              that creates, schedules, and optimizes campaigns like a professional CMO.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="mavro-card p-6 text-center"
            >
              <div className="text-[#ff6b6b] mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Persona Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mavro-card p-8"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 text-[#ff6b6b] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Choose Your Demo Persona
            </h3>
            <p className="text-white/70">
              Select a business type to see how Mavro Plus transforms your marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {profiles.map((profile, index) => (
              <motion.button
                key={profile.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                onClick={() => handlePersonaSelect(profile.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  selectedPersona === profile.id
                    ? 'border-[#ff6b6b] bg-[#ff6b6b]/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="persona-avatar w-16 h-16 mx-auto mb-4 text-2xl">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-semibold text-white mb-2">{profile.name}</h4>
                <p className="text-white/70 text-sm mb-2">{profile.business}</p>
                <p className="text-white/50 text-xs">{profile.industry}</p>
                <div className="mt-4 flex items-center justify-center text-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Start Demo</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-white/60 text-sm">
              No account needed • Full demo access • See real results
            </p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm mb-4">
            Ready to transform your marketing?
          </p>
          <button
            onClick={() => profiles.length > 0 && handlePersonaSelect(profiles[0].id)}
            className="mavro-btn-primary text-lg px-8 py-4"
          >
            Start Your Demo Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DemoLogin;