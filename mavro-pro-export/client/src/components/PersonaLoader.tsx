import { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { ChevronDown, User, Building2, MapPin } from 'lucide-react';

interface PersonaLoaderProps {
  onPersonaChange?: (persona: string) => void;
}

export default function PersonaLoader({ onPersonaChange }: PersonaLoaderProps) {
  const { profile, profiles, switchProfile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonaSwitch = async (personaId: string) => {
    setIsLoading(true);
    
    // Simulate loading demo data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    switchProfile(personaId);
    onPersonaChange?.(personaId);
    setIsOpen(false);
    setIsLoading(false);
  };

  const getPersonaColor = (industry: string) => {
    const colors = {
      'Real Estate': 'from-blue-500 to-cyan-500',
      'Health & Wellness': 'from-green-500 to-emerald-500',
      'Food & Beverage': 'from-red-500 to-orange-500',
      'Fitness': 'from-purple-500 to-pink-500',
      'Professional Services': 'from-indigo-500 to-blue-500'
    };
    return colors[industry as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mavro-btn mavro-btn-secondary flex items-center space-x-3 min-w-[200px] justify-between"
        disabled={isLoading}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getPersonaColor(profile?.industry || '')} flex items-center justify-center`}>
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium mavro-text">{profile?.name}</div>
            <div className="text-xs mavro-text-muted">{profile?.industry}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[300px] mavro-dropdown z-50">
          <div className="p-2 border-b border-white/10 mb-2">
            <div className="text-sm font-medium mavro-text">Switch Persona</div>
            <div className="text-xs mavro-text-muted">Load different industry demo data</div>
          </div>
          
          <div className="space-y-1">
            {profiles.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handlePersonaSwitch(persona.id)}
                className={`w-full text-left mavro-dropdown-item flex items-center space-x-3 p-3 rounded-lg ${
                  persona.id === profile?.id ? 'bg-white/10' : ''
                }`}
                disabled={isLoading}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getPersonaColor(persona.industry)} flex items-center justify-center flex-shrink-0`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium mavro-text">{persona.name}</div>
                    {persona.id === profile?.id && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="text-xs mavro-text-muted">{persona.role}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Building2 className="w-3 h-3 mavro-text-muted" />
                    <span className="text-xs mavro-text-muted">{persona.businessName}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 mavro-text-muted" />
                    <span className="text-xs mavro-text-muted">{persona.industry}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-2 border-t border-white/10 mt-2">
            <div className="text-xs mavro-text-muted text-center">
              Each persona loads unique demo data & campaigns
            </div>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
          <div className="mavro-spinner"></div>
        </div>
      )}
    </div>
  );
}