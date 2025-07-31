import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import ViViLogo from './ViViLogo';

interface ThemeChangeNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  themeName: string;
  themeColor: string;
  currentPersona: string;
}

const ThemeChangeNotification: React.FC<ThemeChangeNotificationProps> = ({
  isVisible,
  onClose,
  themeName,
  themeColor,
  currentPersona
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getPersonaMessage = () => {
    const messages = {
      kemar: {
        professional: [
          "Your leadership presence just leveled up! 🎯",
          "Command the room with this powerful theme! 💼",
          "Professional excellence, visually enhanced! ⚡"
        ],
        energetic: [
          "Ready to inspire audiences worldwide! 🌟",
          "Your keynote energy is off the charts! 🚀",
          "Motivation mode: ACTIVATED! 💪"
        ],
        warm: [
          "Bringing warmth to your speaking brand! 🔥",
          "Your audience will feel the connection! ❤️",
          "Authentic leadership, beautiful design! ✨"
        ],
        cool: [
          "Cool, calm, collected leadership! 🧊",
          "Serene authority that speaks volumes! 🌙",
          "Mindful leadership, stunning visuals! 🎨"
        ],
        calm: [
          "Zen master of the speaking circuit! 🧘",
          "Balanced energy, powerful impact! ⚖️",
          "Peaceful presence, profound results! 🌸"
        ],
        creative: [
          "Innovation meets inspiration! 🎨",
          "Your creative genius is showing! 💡",
          "Artistic leadership at its finest! 🎭"
        ]
      },
      karen: {
        professional: [
          "Your real estate empire looks stunning! 🏡",
          "Professional excellence in every detail! 💎",
          "Luxury living, premium presentation! ⭐"
        ],
        energetic: [
          "Ready to close those dream deals! 🔥",
          "Your energy sells houses! 💪",
          "Market domination mode: ON! 🚀"
        ],
        warm: [
          "Making house hunting feel like home! 🏠",
          "Your clients will love this warmth! ❤️",
          "Cozy vibes, successful sales! ✨"
        ],
        cool: [
          "Cool confidence in every transaction! 🧊",
          "Sleek sophistication for luxury markets! 💼",
          "Modern elegance, timeless results! 🌟"
        ],
        calm: [
          "Zen approach to real estate success! 🧘",
          "Peaceful negotiations, powerful results! 🌸",
          "Balanced business, beautiful outcomes! ⚖️"
        ],
        creative: [
          "Artistic vision for property marketing! 🎨",
          "Creative solutions, stunning results! 💡",
          "Innovative real estate, beautifully done! 🎭"
        ]
      },
      sarah: {
        professional: [
          "Your wellness sanctuary looks divine! 🌿",
          "Professional beauty, inside and out! 💎",
          "Luxury wellness, expertly presented! ⭐"
        ],
        energetic: [
          "Energizing transformations ahead! ⚡",
          "Your vitality is contagious! 💪",
          "Wellness warrior mode: ACTIVATED! 🔥"
        ],
        warm: [
          "Nurturing souls, healing hearts! ❤️",
          "Your caring touch shows beautifully! 🌸",
          "Warm healing, radiant results! ✨"
        ],
        cool: [
          "Cool serenity for ultimate wellness! 🧊",
          "Refreshing treatments, stunning visuals! 💙",
          "Peaceful luxury, perfect balance! 🌙"
        ],
        calm: [
          "Zen master of wellness and beauty! 🧘",
          "Tranquil treatments, transformative results! 🌸",
          "Mindful beauty, meaningful change! ⚖️"
        ],
        creative: [
          "Artistic wellness, beautiful transformations! 🎨",
          "Creative healing, stunning outcomes! 💡",
          "Innovative beauty, timeless results! 🎭"
        ]
      },
      marco: {
        professional: [
          "Your culinary empire looks delicious! 🍽️",
          "Professional passion, perfectly presented! 💎",
          "Gourmet excellence, visual perfection! ⭐"
        ],
        energetic: [
          "Kitchen fire, creative desire! 🔥",
          "Your culinary passion ignites! ⚡",
          "Chef mode: MAXIMUM FLAVOR! 🚀"
        ],
        warm: [
          "Bringing families together, one meal at a time! ❤️",
          "Your warmth feeds the soul! 🌸",
          "Cozy dining, unforgettable experiences! ✨"
        ],
        cool: [
          "Cool sophistication meets hot flavors! 🧊",
          "Elegant dining, exceptional taste! 💼",
          "Modern cuisine, timeless appeal! 🌟"
        ],
        calm: [
          "Zen cooking, peaceful dining! 🧘",
          "Mindful flavors, meaningful moments! 🌸",
          "Balanced cuisine, beautiful presentation! ⚖️"
        ],
        creative: [
          "Culinary artistry at its finest! 🎨",
          "Creative flavors, stunning visuals! 💡",
          "Innovative cuisine, incredible results! 🎭"
        ]
      },
      alex: {
        professional: [
          "Your fitness empire looks powerful! 💪",
          "Professional strength, expertly presented! 💎",
          "Elite training, premium results! ⭐"
        ],
        energetic: [
          "Beast mode: FULLY ACTIVATED! 🔥",
          "Your energy transforms lives! ⚡",
          "Fitness warrior, unstoppable force! 🚀"
        ],
        warm: [
          "Building strength, nurturing souls! ❤️",
          "Your caring approach shows results! 🌸",
          "Warm encouragement, powerful outcomes! ✨"
        ],
        cool: [
          "Cool confidence, hot results! 🧊",
          "Sleek strength, superior performance! 💼",
          "Modern fitness, timeless principles! 🌟"
        ],
        calm: [
          "Zen fitness, peaceful power! 🧘",
          "Mindful movement, meaningful change! 🌸",
          "Balanced training, beautiful results! ⚖️"
        ],
        creative: [
          "Artistic athleticism, stunning transformations! 🎨",
          "Creative workouts, incredible outcomes! 💡",
          "Innovative fitness, inspiring results! 🎭"
        ]
      },
      david: {
        professional: [
          "Your automotive empire looks premium! 🚗",
          "Professional service, expertly delivered! 💎",
          "Luxury vehicles, exceptional presentation! ⭐"
        ],
        energetic: [
          "High-performance mode: ENGAGED! 🔥",
          "Your passion drives success! ⚡",
          "Sales acceleration: MAXIMUM! 🚀"
        ],
        warm: [
          "Building relationships, one sale at a time! ❤️",
          "Your personal touch makes the difference! 🌸",
          "Warm service, winning results! ✨"
        ],
        cool: [
          "Cool sophistication, hot sales! 🧊",
          "Sleek vehicles, superior service! 💼",
          "Modern automotive, timeless quality! 🌟"
        ],
        calm: [
          "Zen approach to automotive success! 🧘",
          "Peaceful negotiations, powerful results! 🌸",
          "Balanced business, beautiful outcomes! ⚖️"
        ],
        creative: [
          "Artistic automotive, stunning showroom! 🎨",
          "Creative solutions, incredible sales! 💡",
          "Innovative approach, inspiring results! 🎭"
        ]
      }
    };

    const personaMessages = messages[currentPersona as keyof typeof messages];
    if (!personaMessages) return "Theme applied successfully! Looking fantastic! ✨";

    const moodMessages = personaMessages[themeName.toLowerCase().includes('professional') ? 'professional' :
                                          themeName.toLowerCase().includes('energy') ? 'energetic' :
                                          themeName.toLowerCase().includes('warm') ? 'warm' :
                                          themeName.toLowerCase().includes('cool') || themeName.toLowerCase().includes('night') ? 'cool' :
                                          themeName.toLowerCase().includes('calm') || themeName.toLowerCase().includes('focus') ? 'calm' :
                                          'creative' as keyof typeof personaMessages];

    return moodMessages[Math.floor(Math.random() * moodMessages.length)];
  };

  const getPersonaName = () => {
    const names = {
      kemar: 'Kemar',
      karen: 'Karen',
      sarah: 'Sarah',
      marco: 'Marco',
      alex: 'Alex',
      david: 'David'
    };
    return names[currentPersona as keyof typeof names] || 'Friend';
  };

  // Confetti animation
  const ConfettiPiece = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ backgroundColor: color, left: `${x}%` }}
      initial={{ y: -20, opacity: 1, scale: 0 }}
      animate={{ 
        y: 400, 
        opacity: 0, 
        scale: 1,
        rotate: 360,
        x: Math.random() * 100 - 50 
      }}
      transition={{ 
        duration: 3, 
        delay: delay,
        ease: "easeOut"
      }}
    />
  );

  const confettiColors = [themeColor, '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {Array.from({ length: 50 }).map((_, i) => (
                <ConfettiPiece
                  key={i}
                  delay={i * 0.05}
                  x={Math.random() * 100}
                  color={confettiColors[i % confettiColors.length]}
                />
              ))}
            </div>
          )}

          {/* Notification */}
          <motion.div
            className="fixed top-4 right-4 z-50 max-w-md"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl border-2 p-6 relative overflow-hidden"
              style={{ borderColor: themeColor }}
            >
              {/* Background gradient */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{ background: `linear-gradient(135deg, ${themeColor}, transparent)` }}
              />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: themeColor }}
                  >
                    <ViViLogo size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">ViVi</h3>
                    <p className="text-xs text-gray-500">AI Assistant</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    {themeName} Applied! 🎨
                  </h4>
                  <p className="text-sm text-gray-600">
                    Hey {getPersonaName()}! {getPersonaMessage()}
                  </p>
                </div>

                {/* Animation elements */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
                    </motion.div>
                    <span className="text-xs text-gray-500">Theme activated</span>
                  </div>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: themeColor }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeChangeNotification;