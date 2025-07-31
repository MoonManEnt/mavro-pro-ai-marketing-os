import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useViVi } from './ViViAgentIntegration';
import { loadPersonaProfile, savePersonaProfile } from '@/modules/ViViPersonaProfile';
import { applyAgentPack, behaviorProfiles } from '@/modules/ViViAgentPacks';
import { fetchAvailableSounds, suggestSoundByContentType } from '@/modules/SoundLibraryFetcher';
import { generateMonthlyPlan } from '@/modules/AutoPilotScheduler';
import { generateFollowUpMessage } from '@/modules/CRMFollowUpEngine';
import { generateReviewResponse } from '@/modules/ReviewResponseEngine';
import { trackHashtagPerformance } from '@/modules/HashtagPerformanceTracker';
import { forecastROI } from '@/modules/ROIForecastEngine';
import { 
  Bot, 
  Calendar, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Music, 
  Zap, 
  Users, 
  BarChart3,
  Mail,
  Phone,
  Hash,
  DollarSign,
  Target,
  Sparkles
} from "lucide-react";

export const AgentPackSelector: React.FC = () => {
  const { currentPersona, setPersona } = useViVi();
  const [selectedPack, setSelectedPack] = useState('');
  const availablePacks = Object.entries(behaviorProfiles).map(([id, profile]) => ({
    id,
    name: `${id.charAt(0).toUpperCase() + id.slice(1)} Pack`,
    ...profile
  }));

  const handleSelectPack = (packId: string) => {
    const profile = loadPersonaProfile();
    const updated = applyAgentPack(profile, packId);
    savePersonaProfile(updated);
    setSelectedPack(packId);
    alert(`ViVi Pack "${packId}" installed successfully`);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-400" />
          <span>🧠 ViVi Agent Packs</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePacks.map((pack) => (
            <div 
              key={pack.id}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleSelectPack(pack.id)}
            >
              <h4 className="text-white font-medium mb-2">{pack.name}</h4>
              <p className="text-gray-300 text-sm mb-3">Tone: {pack.tone}</p>
              <div className="space-y-1">
                {pack.offers.map((offer, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                    {offer}
                  </Badge>
                ))}
              </div>
              <div className="mt-2">
                {pack.exampleHashtags.map((tag, idx) => (
                  <span key={idx} className="text-blue-300 text-xs mr-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {selectedPack && (
          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-300 text-sm">
              ✅ Agent pack "{selectedPack}" successfully applied to your persona!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const SoundSelector: React.FC<{ platform: string; contentType: string; onSelect: (sound: string) => void }> = ({ 
  platform, 
  contentType, 
  onSelect 
}) => {
  const { currentPersona } = useViVi();
  const [sounds, setSounds] = useState<any[]>([]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const loadSounds = async () => {
      setLoading(true);
      try {
        const allSounds = await fetchAvailableSounds(platform);
        const contentSuggestions = suggestSoundByContentType(contentType);
        const personaSuggestions = getSoundByPersona(currentPersona);
        
        setSounds(allSounds);
        setSuggested([...contentSuggestions, ...personaSuggestions].slice(0, 5));
      } catch (error) {
        console.error('Failed to load sounds:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSounds();
  }, [platform, contentType, currentPersona]);

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Music className="w-5 h-5 text-purple-400" />
          <span>🎵 Sound Library for {contentType}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggested.length > 0 && (
          <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <p className="text-purple-300 text-sm font-medium mb-2">ViVi Suggests:</p>
            <div className="flex flex-wrap gap-2">
              {suggested.map((sound, idx) => (
                <Badge key={idx} variant="secondary" className="bg-purple-600/30 text-purple-200">
                  {sound}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Select onValueChange={onSelect}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder={loading ? "Loading sounds..." : "Select a sound"} />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/20">
            {sounds.map((sound, idx) => (
              <SelectItem key={idx} value={sound.name} className="text-white hover:bg-white/10">
                {sound.name} ({sound.usageCount} uses)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export const AutoPilotDashboard: React.FC = () => {
  const { currentPersona } = useViVi();
  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [planType, setPlanType] = useState<'weekly' | 'monthly'>('monthly');
  
  const persona = loadPersonaProfile();

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const posts = await generateMonthlyPlan(persona);
      setPlan(posts);
    } catch (error) {
      console.error('Failed to generate plan:', error);
      alert('Failed to generate content plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span>🚀 AutoPilot Content Planning</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4 items-center">
          <Select value={planType} onValueChange={(value: 'weekly' | 'monthly') => setPlanType(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              <SelectItem value="weekly" className="text-white">Weekly Plan</SelectItem>
              <SelectItem value="monthly" className="text-white">Monthly Plan</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleGeneratePlan} 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              `Generate ${planType === 'monthly' ? '30-Day' : '7-Day'} Plan`
            )}
          </Button>
        </div>

        {loading && (
          <div className="space-y-2">
            <Progress value={plan.length * (100 / (planType === 'monthly' ? 30 : 7))} className="h-2" />
            <p className="text-gray-300 text-sm">
              Generating content {plan.length + 1} of {planType === 'monthly' ? 30 : 7}...
            </p>
          </div>
        )}

        {plan.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <h4 className="text-white font-medium">Generated Content Plan:</h4>
            {plan.map((post, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-purple-300 font-medium">Day {post.day}</span>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="text-xs">{post.platform}</Badge>
                    <Badge variant="secondary" className="text-xs">{post.time}</Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{post.content}</p>
                {post.hashtags && (
                  <p className="text-blue-300 text-xs mt-2">{post.hashtags}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const CRMandReviewPanel: React.FC = () => {
  const { currentPersona } = useViVi();
  const [review, setReview] = useState('');
  const [lead, setLead] = useState({ name: '', service: '' });
  const [response, setResponse] = useState('');
  const [followup, setFollowup] = useState('');
  const [loading, setLoading] = useState({ review: false, followup: false });
  
  const persona = loadPersonaProfile();

  const handleGenerateReviewResponse = async () => {
    setLoading(prev => ({ ...prev, review: true }));
    try {
      const res = await generateReviewResponse(review, persona);
      setResponse(res);
    } catch (error) {
      console.error('Failed to generate review response:', error);
      alert('Failed to generate review response. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, review: false }));
    }
  };

  const handleGenerateFollowup = async () => {
    setLoading(prev => ({ ...prev, followup: true }));
    try {
      const msg = await generateFollowUpMessage(lead, persona);
      setFollowup(msg);
    } catch (error) {
      console.error('Failed to generate follow-up:', error);
      alert('Failed to generate follow-up message. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, followup: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Review Response */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Star className="w-5 h-5 text-purple-400" />
            <span>💬 Review Response Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste customer review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            rows={4}
          />
          
          <Button 
            onClick={handleGenerateReviewResponse}
            disabled={loading.review || !review.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading.review ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating Response...
              </>
            ) : (
              'Generate ViVi Response'
            )}
          </Button>
          
          {response && (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h5 className="text-white font-medium mb-2">Generated Response:</h5>
              <p className="text-gray-300 text-sm leading-relaxed">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CRM Follow-up */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>📧 CRM Follow-Up Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Lead Name"
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
          
          <Input
            placeholder="Interested Service"
            value={lead.service}
            onChange={(e) => setLead({ ...lead, service: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
          
          <Button 
            onClick={handleGenerateFollowup}
            disabled={loading.followup || !lead.name.trim() || !lead.service.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading.followup ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating Follow-up...
              </>
            ) : (
              'Generate Follow-Up Message'
            )}
          </Button>
          
          {followup && (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h5 className="text-white font-medium mb-2">Generated Follow-up:</h5>
              <p className="text-gray-300 text-sm leading-relaxed">{followup}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const CampaignSuccessDashboard: React.FC<{ content?: string; posts?: any[] }> = ({ 
  content = "Sample campaign content", 
  posts = [] 
}) => {
  const roi = forecastROI(content);
  const hashtagData = trackHashtagPerformance(posts);

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          <span>📊 Campaign Success Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ROI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <div className="text-2xl font-bold text-blue-400">{roi.views.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Projected Views</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <div className="text-2xl font-bold text-green-400">{roi.clicks.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Estimated Clicks</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <div className="text-2xl font-bold text-yellow-400">{roi.leads.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Projected Leads</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <div className="text-2xl font-bold text-purple-400">${roi.projectedRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Est. Revenue</div>
          </div>
        </div>

        {/* Top Performing Hashtags */}
        {hashtagData.length > 0 && (
          <div>
            <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
              <Hash className="w-4 h-4" />
              <span>🏷️ Top Performing Hashtags</span>
            </h4>
            <div className="space-y-2">
              {hashtagData.slice(0, 5).map((tag, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-blue-300 font-medium">{tag.tag}</span>
                  <div className="text-right">
                    <div className="text-white text-sm">{Math.round(tag.averageEngagement)} avg engagement</div>
                    <div className="text-gray-400 text-xs">Used {tag.usageCount}x</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default {
  AgentPackSelector,
  SoundSelector,
  AutoPilotDashboard,
  CRMandReviewPanel,
  CampaignSuccessDashboard
};