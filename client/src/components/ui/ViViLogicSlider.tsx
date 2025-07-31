import React, { useState, useEffect } from 'react';
import { Brain, Zap, Settings, Info } from 'lucide-react';

interface ViViLogicSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  showLabels?: boolean;
  showInfo?: boolean;
  className?: string;
}

/**
 * ViVi Logic Slider Component - Controls ViVi's autonomy level
 * Allows users to set how much ViVi can auto-execute decisions
 */
const ViViLogicSlider: React.FC<ViViLogicSliderProps> = ({ 
  value = 0.7, 
  onChange, 
  showLabels = true,
  showInfo = true,
  className = ""
}) => {
  const [autonomyLevel, setAutonomyLevel] = useState(value);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setAutonomyLevel(value);
  }, [value]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setAutonomyLevel(newValue);
    onChange?.(newValue);
  };

  const getAutonomyLabel = () => {
    if (autonomyLevel <= 0.3) return 'Manual';
    if (autonomyLevel <= 0.5) return 'Assisted';
    if (autonomyLevel <= 0.7) return 'Smart';
    if (autonomyLevel <= 0.9) return 'Autonomous';
    return 'Full Auto';
  };

  const getAutonomyColor = () => {
    if (autonomyLevel <= 0.3) return 'text-gray-600';
    if (autonomyLevel <= 0.5) return 'text-blue-600';
    if (autonomyLevel <= 0.7) return 'text-purple-600';
    if (autonomyLevel <= 0.9) return 'text-indigo-600';
    return 'text-green-600';
  };

  const getSliderBackground = () => {
    const percentage = autonomyLevel * 100;
    if (autonomyLevel <= 0.3) {
      return `linear-gradient(to right, #9CA3AF 0%, #9CA3AF ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }
    if (autonomyLevel <= 0.5) {
      return `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }
    if (autonomyLevel <= 0.7) {
      return `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }
    if (autonomyLevel <= 0.9) {
      return `linear-gradient(to right, #6366F1 0%, #6366F1 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }
    return `linear-gradient(to right, #10B981 0%, #10B981 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
  };

  const getAutonomyDescription = () => {
    if (autonomyLevel <= 0.3) {
      return 'ViVi asks permission before all actions. You maintain full control.';
    }
    if (autonomyLevel <= 0.5) {
      return 'ViVi assists with suggestions but requires approval for important actions.';
    }
    if (autonomyLevel <= 0.7) {
      return 'ViVi handles routine tasks automatically and asks for complex decisions.';
    }
    if (autonomyLevel <= 0.9) {
      return 'ViVi operates independently for most tasks, only consulting on critical decisions.';
    }
    return 'ViVi handles all automation independently. Maximum efficiency mode.';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-sm font-semibold text-gray-900">ViVi Autonomy Level</h3>
        </div>
        
        {showInfo && (
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
          >
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
            {showTooltip && (
              <div className="absolute right-0 top-6 w-64 p-3 bg-black text-white text-xs rounded-lg shadow-lg z-10">
                <p>Control how independently ViVi can make decisions and execute actions on your behalf.</p>
              </div>
            )}
          </button>
        )}
      </div>

      {/* Current Level Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className={`w-4 h-4 ${getAutonomyColor()}`} />
          <span className={`text-sm font-medium ${getAutonomyColor()}`}>
            {getAutonomyLabel()}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {Math.round(autonomyLevel * 100)}%
        </span>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={autonomyLevel}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: getSliderBackground()
          }}
        />
        
        {/* Custom slider styles are handled via CSS classes */}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>Manual</span>
          <span>Assisted</span>
          <span>Smart</span>
          <span>Autonomous</span>
          <span>Full Auto</span>
        </div>
      )}

      {/* Description */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 leading-relaxed">
          {getAutonomyDescription()}
        </p>
      </div>

      {/* Action Examples */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-700">What ViVi will auto-handle:</h4>
        <div className="space-y-1">
          {autonomyLevel > 0.3 && (
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span>Critical alerts (reviews, mentions)</span>
            </div>
          )}
          {autonomyLevel > 0.5 && (
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>Content scheduling optimization</span>
            </div>
          )}
          {autonomyLevel > 0.7 && (
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Trend-based content suggestions</span>
            </div>
          )}
          {autonomyLevel > 0.9 && (
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
              <span>Advanced campaign optimization</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ViViLogicSliderCompactProps {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

/**
 * Compact version for smaller spaces
 */
export const ViViLogicSliderCompact: React.FC<ViViLogicSliderCompactProps> = ({ 
  value = 0.7, 
  onChange, 
  className = "" 
}) => {
  const [autonomyLevel, setAutonomyLevel] = useState(value);

  useEffect(() => {
    setAutonomyLevel(value);
  }, [value]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setAutonomyLevel(newValue);
    onChange?.(newValue);
  };

  const getAutonomyLabel = () => {
    if (autonomyLevel <= 0.3) return 'Manual';
    if (autonomyLevel <= 0.5) return 'Assisted';
    if (autonomyLevel <= 0.7) return 'Smart';
    if (autonomyLevel <= 0.9) return 'Autonomous';
    return 'Full Auto';
  };

  const getSliderBackground = () => {
    const percentage = autonomyLevel * 100;
    return `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Settings className="w-4 h-4 text-gray-600" />
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={autonomyLevel}
          onChange={handleSliderChange}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
          style={{
            background: getSliderBackground()
          }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600 min-w-[60px]">
        {getAutonomyLabel()}
      </span>
    </div>
  );
};

export default ViViLogicSlider;