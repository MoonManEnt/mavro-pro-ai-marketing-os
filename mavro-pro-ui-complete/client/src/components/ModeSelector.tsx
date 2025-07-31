import { useState } from 'react';
import { useMode } from '@/contexts/ModeContext';
import { Target, TrendingUp, BarChart3, Sparkles } from 'lucide-react';

interface ModeTab {
  id: 'plan' | 'track' | 'grow';
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const modes: ModeTab[] = [
  {
    id: 'plan',
    label: 'Plan',
    description: 'Create content, schedule posts, and plan campaigns',
    icon: <Target className="w-5 h-5" />,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'track',
    label: 'Track',
    description: 'Monitor performance, analyze metrics, and track ROI',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'grow',
    label: 'Grow',
    description: 'Advanced campaigns, automation, and scaling tools',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'from-purple-500 to-yellow-500'
  }
];

interface ModeSelectorProps {
  activeMode: string;
  onModeChange: (mode: 'plan' | 'track' | 'grow') => void;
}

export default function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  const { mode: systemMode } = useMode();
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-6">
      {/* Flowing Navigation Bar */}
      <div className="relative">
        {/* Background Bar */}
        <div className="mavro-glass rounded-2xl p-2 backdrop-blur-20">
          <div className="flex relative">
            {/* Active Mode Background Slider */}
            <div 
              className={`absolute top-0 bottom-0 bg-gradient-to-r ${
                modes.find(m => m.id === activeMode)?.color
              } rounded-xl transition-all duration-500 ease-out shadow-lg`}
              style={{
                left: `${(modes.findIndex(m => m.id === activeMode) * 100) / modes.length}%`,
                width: `calc(${100 / modes.length}% - 0.5rem)`,
                transform: 'translateX(0.25rem) translateY(0.25rem)'
              }}
            />
            
            {/* Mode Buttons */}
            {modes.map((mode, index) => (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                onMouseEnter={() => setHoveredMode(mode.id)}
                onMouseLeave={() => setHoveredMode(null)}
                className={`relative flex-1 flex flex-col items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 z-10 ${
                  activeMode === mode.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {/* Icon */}
                <div className={`p-2 rounded-lg mb-2 transition-all duration-300 ${
                  activeMode === mode.id 
                    ? 'bg-white/20 transform scale-110' 
                    : hoveredMode === mode.id
                      ? 'bg-white/10 transform scale-105'
                      : 'bg-white/5'
                }`}>
                  {mode.icon}
                </div>
                
                {/* Label */}
                <div className="font-semibold text-base mb-1">{mode.label}</div>
                
                {/* Description */}
                <div className={`text-xs text-center leading-tight transition-all duration-300 ${
                  activeMode === mode.id ? 'text-white/90' : 'text-white/60'
                }`}>
                  {mode.description}
                </div>
                
                {/* Active indicator dot */}
                {activeMode === mode.id && (
                  <div className="absolute -top-1 right-2 w-3 h-3 bg-white rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mode Status Indicator */}
        <div className="flex items-center justify-center mt-4">
          <div className="mavro-badge secondary">
            <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${
              modes.find(m => m.id === activeMode)?.color
            }`} />
            {modes.find(m => m.id === activeMode)?.label} Mode • {systemMode === 'demo' ? 'Demo Environment' : 'Live Environment'}
          </div>
        </div>
      </div>

      {/* Mode Description */}
      <div className="mavro-card">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${
            modes.find(m => m.id === activeMode)?.color
          }`}>
            {modes.find(m => m.id === activeMode)?.icon}
          </div>
          <div>
            <h3 className="mavro-heading text-lg">
              {modes.find(m => m.id === activeMode)?.label} Mode
            </h3>
            <div className="text-sm mavro-text-muted">
              {systemMode === 'demo' ? 'Demo Environment' : 'Live Environment'}
            </div>
          </div>
        </div>
        
        <p className="mavro-text-secondary mb-4">
          {modes.find(m => m.id === activeMode)?.description}
        </p>
        
        {/* Mode-specific features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMode === 'plan' && (
            <>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Mavro Magic Composer</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Visual Scheduler</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Content Mirror</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Campaign Planner</span>
              </div>
            </>
          )}
          
          {activeMode === 'track' && (
            <>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>FourSIGHT Dashboard</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>ROI Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Performance Metrics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Churn Prediction</span>
              </div>
            </>
          )}
          
          {activeMode === 'grow' && (
            <>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Advanced Campaigns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Automation Rules</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>A/B Testing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mavro-text-secondary">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Scaling Tools</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}