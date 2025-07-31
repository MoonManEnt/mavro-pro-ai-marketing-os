import React, { useState } from "react";
import { Package, CheckCircle, Download, Sparkles } from "lucide-react";
import { loadPersonaProfile, savePersonaProfile } from "../../modules/ViViPersonaProfile";
import { applyAgentPack, behaviorProfiles } from "../../modules/ViViAgentPacks";

const AgentPackSelector: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [installedPacks, setInstalledPacks] = useState<string[]>([]);

  const handleInstall = (packId: string) => {
    const profile = loadPersonaProfile();
    const updated = applyAgentPack(profile, packId);
    savePersonaProfile(updated);
    
    setInstalledPacks(prev => [...prev, packId]);
    setSelectedPack(packId);
    
    // Show success feedback
    setTimeout(() => setSelectedPack(null), 2000);
  };

  const packDetails = [
    {
      id: "medspa",
      name: "MedSpa Growth Pack",
      description: "Specialized content for wellness and beauty services",
      icon: "💆‍♀️",
      color: "from-pink-500 to-rose-500",
      features: ["Beauty content templates", "Wellness engagement hooks", "Treatment promotion strategies"]
    },
    {
      id: "real_estate", 
      name: "Real Estate Pro Pack",
      description: "Professional real estate marketing automation",
      icon: "🏠",
      color: "from-blue-500 to-indigo-500",
      features: ["Property showcase templates", "Market insight posts", "Client testimonial frameworks"]
    },
    {
      id: "cleaning",
      name: "Cleaning Service Pack", 
      description: "Engaging content for cleaning businesses",
      icon: "✨",
      color: "from-green-500 to-teal-500",
      features: ["Before/after showcases", "Cleaning tip content", "Service promotion templates"]
    }
  ];

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ViVi Agent Store
          </h3>
          <p className="text-sm text-gray-400">Industry-specific AI behavior packs</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packDetails.map((pack) => {
          const isInstalled = installedPacks.includes(pack.id);
          const isSelected = selectedPack === pack.id;
          
          return (
            <div
              key={pack.id}
              className="relative p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${pack.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {pack.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{pack.name}</h4>
                    <p className="text-gray-400 text-sm">{pack.description}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">Features:</div>
                <ul className="space-y-1">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-center space-x-2">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleInstall(pack.id)}
                disabled={isInstalled}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isInstalled
                    ? "bg-green-500/20 text-green-400 border border-green-400/30"
                    : isSelected
                    ? "bg-purple-500 text-white"
                    : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30 hover:from-purple-500 hover:to-pink-500"
                }`}
              >
                {isInstalled ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Installed</span>
                  </>
                ) : isSelected ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Installing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Install Pack</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {installedPacks.length > 0 && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">
              {installedPacks.length} Agent Pack{installedPacks.length > 1 ? 's' : ''} Active
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentPackSelector;