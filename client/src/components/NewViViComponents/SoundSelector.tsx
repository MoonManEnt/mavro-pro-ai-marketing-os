import React, { useEffect, useState } from "react";
import { Music, TrendingUp, Play, Check } from "lucide-react";
import { fetchAvailableSounds, suggestSoundByContentType } from "../../modules/SoundLibraryFetcher";

interface SoundSelectorProps {
  platform: string;
  contentType: string;
  onSelect: (sound: string) => void;
}

const SoundSelector: React.FC<SoundSelectorProps> = ({ platform, contentType, onSelect }) => {
  const [sounds, setSounds] = useState<any[]>([]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [selectedSound, setSelectedSound] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSounds() {
      setLoading(true);
      try {
        const all = await fetchAvailableSounds(platform);
        const recs = suggestSoundByContentType(contentType);
        setSounds(all);
        setSuggested(recs);
      } catch (error) {
        console.error("Failed to load sounds:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSounds();
  }, [platform, contentType]);

  const handleSoundSelect = (soundName: string) => {
    setSelectedSound(soundName);
    onSelect(soundName);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/20 rounded-lg w-1/2"></div>
          <div className="space-y-2">
            <div className="h-12 bg-white/10 rounded-lg"></div>
            <div className="h-12 bg-white/10 rounded-lg"></div>
            <div className="h-12 bg-white/10 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Select Sound for {contentType}
          </h4>
          <p className="text-sm text-gray-400">Choose trending audio for {platform}</p>
        </div>
      </div>

      {suggested.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">ViVi Suggests</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggested.map((sound, i) => (
              <button
                key={i}
                onClick={() => handleSoundSelect(sound)}
                className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                  selectedSound === sound
                    ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/50"
                    : "bg-white/5 text-gray-300 border-white/20 hover:border-yellow-400/30 hover:text-yellow-400"
                }`}
              >
                {sound}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h5 className="text-white font-medium mb-3">All Available Sounds</h5>
        {sounds.length > 0 ? (
          sounds.map((sound, i) => (
            <button
              key={i}
              onClick={() => handleSoundSelect(sound.name)}
              className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                selectedSound === sound.name
                  ? "bg-purple-500/20 border-purple-400/50"
                  : "bg-white/5 border-white/10 hover:border-purple-400/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedSound === sound.name ? "bg-purple-500" : "bg-white/10"
                  }`}>
                    {selectedSound === sound.name ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{sound.name}</p>
                    <p className="text-gray-400 text-sm">{sound.usageCount.toLocaleString()} uses</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">Trending</span>
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
            <p className="text-gray-400">No sounds available for {platform}</p>
          </div>
        )}
      </div>

      {selectedSound && (
        <div className="mt-6 p-4 bg-purple-500/10 border border-purple-400/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">
              Selected: {selectedSound}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundSelector;