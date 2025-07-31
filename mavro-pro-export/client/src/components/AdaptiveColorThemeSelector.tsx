import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sun, Moon, Sparkles, Zap, Droplets, Flame, Leaf, Mountain } from 'lucide-react';

interface AdaptiveColorThemeSelectorProps {
  currentPersona: string;
  onThemeChange: (theme: ColorTheme) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  mood: 'energetic' | 'calm' | 'professional' | 'creative' | 'warm' | 'cool';
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
}

const AdaptiveColorThemeSelector: React.FC<AdaptiveColorThemeSelectorProps> = ({
  currentPersona,
  onThemeChange,
  isOpen,
  onClose
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('adaptive');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [detectedMood, setDetectedMood] = useState<string>('professional');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      adaptThemeToContext();
    }, 60000); // Update every minute

    // Load saved theme on mount
    const savedTheme = localStorage.getItem('mavro-theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        setSelectedTheme(theme.id);
        applyThemeToDocument(theme);
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    }

    return () => clearInterval(timer);
  }, [currentPersona]);

  const adaptThemeToContext = () => {
    const hour = currentTime.getHours();
    const month = currentTime.getMonth();
    
    // Determine time of day
    let timeOfDay: ColorTheme['timeOfDay'];
    if (hour >= 6 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';
    
    // Determine season
    let season: ColorTheme['season'];
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';
    
    // Adapt mood based on persona and context
    const personaMoods = {
      kemar: 'professional',
      karen: 'energetic',
      sarah: 'calm',
      marco: 'warm',
      alex: 'energetic',
      david: 'professional'
    };
    
    setDetectedMood(personaMoods[currentPersona as keyof typeof personaMoods] || 'professional');
  };

  const getPersonaThemes = (): ColorTheme[] => {
    const baseThemes: ColorTheme[] = [
      {
        id: 'adaptive',
        name: 'Adaptive Intelligence',
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#DDD6FE',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#1F2937',
        mood: 'professional'
      },
      {
        id: 'energetic_morning',
        name: 'Morning Energy',
        primary: '#F59E0B',
        secondary: '#FBB042',
        accent: '#FEF3C7',
        background: '#FFFBF0',
        surface: '#FFFFFF',
        text: '#1F2937',
        mood: 'energetic',
        timeOfDay: 'morning'
      },
      {
        id: 'calm_afternoon',
        name: 'Afternoon Focus',
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#D1FAE5',
        background: '#F0FDF4',
        surface: '#FFFFFF',
        text: '#1F2937',
        mood: 'calm',
        timeOfDay: 'afternoon'
      },
      {
        id: 'warm_evening',
        name: 'Evening Warmth',
        primary: '#EF4444',
        secondary: '#F87171',
        accent: '#FEE2E2',
        background: '#FEF2F2',
        surface: '#FFFFFF',
        text: '#1F2937',
        mood: 'warm',
        timeOfDay: 'evening'
      },
      {
        id: 'cool_night',
        name: 'Night Mode',
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#DBEAFE',
        background: '#1F2937',
        surface: '#374151',
        text: '#F9FAFB',
        mood: 'cool',
        timeOfDay: 'night'
      }
    ];

    // Add persona-specific themes
    const personaThemes = {
      kemar: [
        {
          id: 'leadership_purple',
          name: 'Leadership Authority',
          primary: '#8B5CF6',
          secondary: '#A78BFA',
          accent: '#DDD6FE',
          background: '#FAFAFA',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'professional' as const
        },
        {
          id: 'keynote_gold',
          name: 'Keynote Presence',
          primary: '#F59E0B',
          secondary: '#FBB042',
          accent: '#FEF3C7',
          background: '#FFFBF0',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'energetic' as const
        }
      ],
      karen: [
        {
          id: 'growth_green',
          name: 'Growth Success',
          primary: '#10B981',
          secondary: '#34D399',
          accent: '#D1FAE5',
          background: '#F0FDF4',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'energetic' as const
        },
        {
          id: 'luxury_teal',
          name: 'Luxury Properties',
          primary: '#0D9488',
          secondary: '#2DD4BF',
          accent: '#CCFBF1',
          background: '#F0FDFA',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'professional' as const
        }
      ],
      sarah: [
        {
          id: 'wellness_rose',
          name: 'Wellness Harmony',
          primary: '#F472B6',
          secondary: '#FB7185',
          accent: '#FCE7F3',
          background: '#FDF2F8',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'calm' as const
        },
        {
          id: 'beauty_gold',
          name: 'Beauty Radiance',
          primary: '#F59E0B',
          secondary: '#FBB042',
          accent: '#FEF3C7',
          background: '#FFFBF0',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'warm' as const
        }
      ],
      marco: [
        {
          id: 'culinary_red',
          name: 'Culinary Passion',
          primary: '#EF4444',
          secondary: '#F87171',
          accent: '#FEE2E2',
          background: '#FEF2F2',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'warm' as const
        },
        {
          id: 'italian_orange',
          name: 'Italian Warmth',
          primary: '#EA580C',
          secondary: '#FB923C',
          accent: '#FED7AA',
          background: '#FFF7ED',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'energetic' as const
        }
      ],
      alex: [
        {
          id: 'fitness_blue',
          name: 'Fitness Energy',
          primary: '#3B82F6',
          secondary: '#60A5FA',
          accent: '#DBEAFE',
          background: '#EFF6FF',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'energetic' as const
        },
        {
          id: 'performance_cyan',
          name: 'Peak Performance',
          primary: '#06B6D4',
          secondary: '#22D3EE',
          accent: '#CFFAFE',
          background: '#ECFEFF',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'energetic' as const
        }
      ],
      david: [
        {
          id: 'automotive_gray',
          name: 'Automotive Steel',
          primary: '#6B7280',
          secondary: '#9CA3AF',
          accent: '#F3F4F6',
          background: '#FAFAFA',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'professional' as const
        },
        {
          id: 'luxury_black',
          name: 'Luxury Performance',
          primary: '#1F2937',
          secondary: '#4B5563',
          accent: '#E5E7EB',
          background: '#F9FAFB',
          surface: '#FFFFFF',
          text: '#1F2937',
          mood: 'professional' as const
        }
      ]
    };

    const currentPersonaThemes = personaThemes[currentPersona as keyof typeof personaThemes] || [];
    return [...baseThemes, ...currentPersonaThemes];
  };

  const getThemeIcon = (theme: ColorTheme) => {
    const iconMap = {
      adaptive: Sparkles,
      energetic: Zap,
      calm: Droplets,
      professional: Mountain,
      creative: Palette,
      warm: Flame,
      cool: Leaf
    };
    
    if (theme.timeOfDay === 'morning') return Sun;
    if (theme.timeOfDay === 'night') return Moon;
    
    return iconMap[theme.mood] || Palette;
  };

  const applyThemeToDocument = (theme: ColorTheme) => {
    const root = document.documentElement;
    
    // Apply theme CSS variables
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text', theme.text);
    
    // Update Mavro brand colors to use theme
    root.style.setProperty('--mavro-primary', theme.primary);
    root.style.setProperty('--mavro-secondary', theme.secondary);
    root.style.setProperty('--mavro-accent', theme.accent);
    root.style.setProperty('--mavro-bg', theme.background);
    root.style.setProperty('--mavro-card', theme.surface);
    root.style.setProperty('--mavro-text', theme.text);
    
    // Update Tailwind CSS custom properties for better integration
    const primaryHsl = hexToHsl(theme.primary);
    const secondaryHsl = hexToHsl(theme.secondary);
    const accentHsl = hexToHsl(theme.accent);
    const bgHsl = hexToHsl(theme.background);
    const surfaceHsl = hexToHsl(theme.surface);
    const textHsl = hexToHsl(theme.text);
    
    root.style.setProperty('--primary', primaryHsl);
    root.style.setProperty('--secondary', secondaryHsl);
    root.style.setProperty('--accent', accentHsl);
    root.style.setProperty('--background', bgHsl);
    root.style.setProperty('--card', surfaceHsl);
    root.style.setProperty('--foreground', textHsl);
    
    // Apply theme to gradients and borders
    const primaryRgb = hexToRgb(theme.primary);
    const secondaryRgb = hexToRgb(theme.secondary);
    const accentRgb = hexToRgb(theme.accent);
    
    root.style.setProperty('--mavro-purple', theme.primary);
    root.style.setProperty('--mavro-purple-10', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1`);
    root.style.setProperty('--mavro-purple-20', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.2`);
    root.style.setProperty('--mavro-border', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.3`);
    
    // Apply smooth transition for color changes
    document.body.style.transition = 'all 0.5s ease-in-out';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 500);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';
    
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const handleThemeSelect = (theme: ColorTheme) => {
    setSelectedTheme(theme.id);
    onThemeChange(theme);
    applyThemeToDocument(theme);
    
    // Store in localStorage
    localStorage.setItem('mavro-theme', JSON.stringify(theme));
  };

  const getRecommendedTheme = () => {
    const themes = getPersonaThemes();
    const hour = currentTime.getHours();
    
    // Morning recommendation
    if (hour >= 6 && hour < 12) {
      return themes.find(t => t.timeOfDay === 'morning') || themes.find(t => t.mood === 'energetic');
    }
    
    // Evening recommendation
    if (hour >= 17 && hour < 21) {
      return themes.find(t => t.timeOfDay === 'evening') || themes.find(t => t.mood === 'warm');
    }
    
    // Night recommendation
    if (hour >= 21 || hour < 6) {
      return themes.find(t => t.timeOfDay === 'night') || themes.find(t => t.mood === 'cool');
    }
    
    // Default afternoon recommendation
    return themes.find(t => t.timeOfDay === 'afternoon') || themes.find(t => t.mood === 'professional');
  };

  const themes = getPersonaThemes();
  const recommendedTheme = getRecommendedTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Palette className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Adaptive Theme Selector</h2>
                    <p className="text-purple-100">Personalized colors for {currentPersona}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-purple-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Smart Recommendation */}
              {recommendedTheme && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-900">Smart Recommendation</h3>
                        <p className="text-sm text-green-700">
                          Based on current time ({currentTime.toLocaleTimeString()}) and your persona
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleThemeSelect(recommendedTheme)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Apply {recommendedTheme.name}
                    </button>
                  </div>
                </div>
              )}

              {/* Theme Categories */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Themes</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themes.map((theme) => {
                    const IconComponent = getThemeIcon(theme);
                    const isSelected = selectedTheme === theme.id;
                    
                    return (
                      <motion.div
                        key={theme.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleThemeSelect(theme)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{theme.name}</h4>
                            <p className="text-xs text-gray-500 capitalize">{theme.mood}</p>
                          </div>
                        </div>
                        
                        {/* Color Preview */}
                        <div className="flex space-x-2 mb-3">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                        
                        {/* Theme Tags */}
                        <div className="flex flex-wrap gap-1">
                          {theme.timeOfDay && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {theme.timeOfDay}
                            </span>
                          )}
                          {theme.season && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {theme.season}
                            </span>
                          )}
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {theme.mood}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Theme Builder */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Custom Theme Builder</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Coming soon: Create your own personalized color themes
                </p>
                <button 
                  disabled
                  className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                >
                  Build Custom Theme
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdaptiveColorThemeSelector;