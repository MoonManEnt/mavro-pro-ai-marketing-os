import React, { useState } from "react";
import { Play, Pause, Calendar, Clock, Zap } from "lucide-react";
import { generateMonthlyPlan } from "../../modules/AutoPilotScheduler";
import { loadPersonaProfile } from "../../modules/ViViPersonaProfile";

const AutoPilotDashboard: React.FC = () => {
  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const persona = loadPersonaProfile();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const posts = await generateMonthlyPlan(persona);
      setPlan(posts);
      setIsActive(true);
    } catch (error) {
      console.error("Failed to generate plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoPilot = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ViVi AutoPilot
            </h2>
            <p className="text-sm text-gray-400">30-Day Content Planning</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{loading ? "Generating..." : "Generate Plan"}</span>
          </button>

          {plan.length > 0 && (
            <button
              onClick={toggleAutoPilot}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse flex items-center space-x-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}

      {plan.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">Generated Content Plan</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
            }`}>
              {isActive ? "Active" : "Paused"}
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3">
            {plan.slice(0, 7).map((post, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-purple-400 font-semibold">Day {post.day}</span>
                      <span className="text-xs text-gray-400">• {post.time}</span>
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                        {post.platform}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {plan.length > 7 && (
            <div className="mt-4 text-center">
              <span className="text-gray-400 text-sm">
                Showing 7 of {plan.length} planned posts
              </span>
            </div>
          )}
        </div>
      )}

      {!loading && plan.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
          <p className="text-gray-400">Click "Generate Plan" to create your 30-day content strategy</p>
        </div>
      )}
    </div>
  );
};

export default AutoPilotDashboard;