import React, { useState } from 'react';
import { Calendar, TrendingUp, Music, Target, Sparkles, Clock, BarChart3, Users, Play, Settings, Wand2, Upload, Image, Video, FileText, Mail, Share2, Check, Save, Edit, X, Mic } from 'lucide-react';
import { SiInstagram, SiX, SiLinkedin, SiTiktok, SiFacebook, SiYoutube } from 'react-icons/si';
import NewAutoPilotDashboard from '../NewViViComponents/AutoPilotDashboard';
import NewSoundSelector from '../NewViViComponents/SoundSelector';
import NewCampaignSuccess from '../NewViViComponents/CampaignSuccessDashboard';
import EnhancedScheduler from '../EnhancedScheduler';

const PlanTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('gtm-planning');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'facebook']);
  const [previewPost, setPreviewPost] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Enhanced Sub-tab Navigation */}
      <div className="flex space-x-2 p-2 bg-gradient-to-r from-gray-50 via-white to-purple-50/30 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl">
        {[
          { id: 'gtm-planning', label: 'GTM Planning', icon: Target },
          { id: 'mavro-magic', label: 'Mavro Magic Studio™', icon: Sparkles },
          { id: 'scheduler', label: 'Scheduler', icon: Calendar }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-400 ${
              activeSubTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-xl border border-purple-400/50 transform scale-105'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-100/50 hover:shadow-lg hover:scale-102'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-sm font-black tracking-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Sub-tab Content */}
      {activeSubTab === 'gtm-planning' && <GTMPlanningContent setActiveSubTab={setActiveSubTab} setPreviewPost={setPreviewPost} setShowPreviewModal={setShowPreviewModal} />}
      {activeSubTab === 'mavro-magic' && <MavroMagicStudioContent />}
      {activeSubTab === 'scheduler' && <SchedulerContent selectedPlatforms={selectedPlatforms} setSelectedPlatforms={setSelectedPlatforms} setActiveSubTab={setActiveSubTab} previewPost={previewPost} setPreviewPost={setPreviewPost} showPreviewModal={showPreviewModal} setShowPreviewModal={setShowPreviewModal} />}

      {/* Post Preview Modal - Global for all sub-tabs */}
      {showPreviewModal && previewPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {previewPost.platform === 'instagram' && <SiInstagram className="w-6 h-6 text-pink-500" />}
                  {previewPost.platform === 'linkedin' && <SiLinkedin className="w-6 h-6 text-blue-600" />}
                  {previewPost.platform === 'tiktok' && <SiTiktok className="w-6 h-6 text-black" />}
                  {previewPost.platform === 'youtube' && <SiYoutube className="w-6 h-6 text-red-600" />}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize">{previewPost.platform} {previewPost.type}</h3>
                    <p className="text-sm text-gray-600">{previewPost.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Platform-specific preview */}
              {previewPost.platform === 'instagram' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-4 aspect-square">
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-gray-400">
                      <Image className="w-12 h-12" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">@your_business</p>
                        <p className="text-sm text-gray-600">{previewPost.trend}</p>
                      </div>
                    </div>
                    <p className="text-gray-900">{previewPost.title} ✨ Ready to transform your morning routine? Check out these game-changing tips that'll have you feeling unstoppable! 💪 #MorningMotivation #SuccessMindset #Productivity</p>
                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                      <span>❤️ 127 likes</span>
                      <span>💬 12 comments</span>
                      <span>📤 5 shares</span>
                    </div>
                  </div>
                </div>
              )}

              {previewPost.platform === 'linkedin' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Your Name</p>
                        <p className="text-sm text-gray-600">Professional Title • 2h</p>
                      </div>
                    </div>
                    <p className="text-gray-900 mb-4">{previewPost.title} - Deep insights into industry trends and professional development strategies. Key takeaways from recent market analysis... #ProfessionalDevelopment #IndustryInsights #Leadership</p>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <div className="w-full h-32 bg-white rounded-lg flex items-center justify-center text-gray-400">
                        <BarChart3 className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-600 text-sm pt-3 border-t border-gray-200">
                      <span>👍 34 reactions</span>
                      <span>💬 8 comments</span>
                      <span>🔄 12 reposts</span>
                    </div>
                  </div>
                </div>
              )}

              {previewPost.platform === 'tiktok' && (
                <div className="space-y-4 flex flex-col items-center">
                  <div className="bg-black rounded-2xl aspect-[9/16] max-h-[500px] w-[280px] relative overflow-hidden">
                    {/* Video Content Area */}
                    <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <Play className="w-20 h-20 text-white/80 z-10" />
                    </div>
                    
                    {/* Top UI - Back button and More */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                      <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-white transform rotate-45"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full ml-1"></div>
                        <div className="w-1 h-1 bg-white rounded-full ml-1"></div>
                      </div>
                    </div>

                    {/* Bottom Content - Caption and User Info */}
                    <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="text-white space-y-2">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">U</span>
                          </div>
                          <div>
                            <p className="font-semibold text-base">@your_username</p>
                            <p className="text-xs text-gray-300">Follow</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed">
                          <span className="font-medium">{previewPost.title}</span> {previewPost.trend} #fyp #viral #trending
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Music className="w-4 h-4" />
                          <p className="text-xs">Original sound - @your_username</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="absolute right-3 bottom-20 flex flex-col space-y-6 text-white">
                      {/* Profile */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center border-2 border-white">
                          <span className="text-white font-bold">U</span>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-black">
                          <span className="text-white text-xs font-bold">+</span>
                        </div>
                      </div>

                      {/* Like */}
                      <div className="text-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <div className="text-2xl animate-pulse">❤️</div>
                        </div>
                        <span className="text-xs font-semibold">1.2M</span>
                      </div>

                      {/* Comment */}
                      <div className="text-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-xl">💬</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold">45.6K</span>
                      </div>

                      {/* Share */}
                      <div className="text-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-xl">📤</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold">89.1K</span>
                      </div>

                      {/* Sound/Music */}
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center animate-spin">
                          <Music className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold mt-1 block">34.2K</span>
                      </div>
                    </div>

                    {/* Bottom Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="h-full w-1/3 bg-white"></div>
                    </div>
                  </div>
                </div>
              )}

              {previewPost.platform === 'youtube' && (
                <div className="space-y-4">
                  <div className="bg-black rounded-xl aspect-video relative">
                    <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center text-white">
                      <Play className="w-16 h-16" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      8:24
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-gray-900">{previewPost.title} - {previewPost.trend}</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Your Channel</p>
                        <p className="text-sm text-gray-600">12.4K subscribers • 3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-600 text-sm">
                      <span>👍 456 likes</span>
                      <span>👎 12 dislikes</span>
                      <span>💬 78 comments</span>
                      <span>📤 Share</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  Schedule Post
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300">
                  Edit Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// GTM Planning Component - Enhanced with Real-Time System Sync
const GTMPlanningContent: React.FC<{ 
  setActiveSubTab: (tab: string) => void;
  setPreviewPost: (post: any) => void;
  setShowPreviewModal: (show: boolean) => void;
}> = ({ setActiveSubTab, setPreviewPost, setShowPreviewModal }) => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [readReports, setReadReports] = useState<Set<string>>(new Set());
  const [marketProgress, setMarketProgress] = useState(73); // Dynamic progress from ViViBoostEngine()
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viviRecommendations, setViviRecommendations] = useState<string[]>([]);

  // Real-time ViVi insights powered by ViViContext + NodeCache
  const [activeInsights, setActiveInsights] = useState<Array<{
    id: string;
    type: 'urgent' | 'opportunity' | 'optimization';
    message: string;
    timestamp: string;
    actionable: boolean;
    source: 'ViViSentimentScanner' | 'CampaignComposer' | 'TrendTap Pro™' | 'BoostEngine';
  }>>([
    {
      id: '1',
      type: 'urgent',
      message: 'Instagram engagement down 15% - recommend posting carousel content at 3 PM EST',
      timestamp: '2 hours ago',
      actionable: true,
      source: 'ViViSentimentScanner'
    },
    {
      id: '2', 
      type: 'opportunity',
      message: 'LinkedIn audience 40% more active on Tuesdays - schedule thought leadership posts',
      timestamp: '4 hours ago',
      actionable: true,
      source: 'TrendTap Pro™'
    },
    {
      id: '3',
      type: 'optimization',
      message: 'TikTok Reels hot zone detected: 8/12-8/16 - optimal posting window identified',
      timestamp: '1 hour ago',
      actionable: true,
      source: 'TrendTap Pro™'
    }
  ]);

  // EOD Reports data structure powered by viviService.getAnalytics()
  const eodReports = [
    {
      id: 'campaign-performance',
      title: 'Campaign Performance EOD',
      type: 'Campaign Stats',
      timestamp: 'Today, 6:00 PM',
      status: readReports.has('campaign-performance') ? 'read' : 'unread',
      urgent: false,
      data: {
        totalImpressions: '24.8K',
        engagement: '+12%',
        conversion: '3.2%',
        topPerformer: 'LinkedIn carousel post'
      }
    },
    {
      id: 'engagement-heatmap',
      title: 'Engagement Heat Map Analysis',
      type: 'Engagement Heat Maps', 
      timestamp: 'Today, 6:15 PM',
      status: readReports.has('engagement-heatmap') ? 'read' : 'unread',
      urgent: true,
      data: {
        peakHours: '2-4 PM, 7-9 PM EST',
        bestPlatform: 'Instagram Stories',
        lowEngagement: 'Facebook posts',
        recommendation: 'Shift 30% budget to Instagram'
      }
    },
    {
      id: 'daily-todo',
      title: "Tomorrow's Action Items",
      type: 'To-Do List',
      timestamp: 'Today, 6:30 PM',
      status: readReports.has('daily-todo') ? 'read' : 'unread',
      urgent: false,
      data: {
        priority: [
          'Review and approve 3 pending Instagram posts',
          'Respond to LinkedIn comments (15 pending)',
          'Launch TikTok video campaign at 11 AM'
        ],
        scheduled: [
          'Weekly analytics review meeting - 2 PM',
          'Content brainstorming session - 4 PM'
        ]
      }
    }
  ];

  // Simulate real-time sync with ViVi systems
  const refreshViViData = async () => {
    setIsRefreshing(true);
    
    // Simulate viviService.getAnalytics() call
    setTimeout(() => {
      setMarketProgress(prev => Math.min(prev + Math.floor(Math.random() * 5), 100));
      setViviRecommendations([
        'Boost Instagram post performance with trending audio',
        'Schedule LinkedIn carousel for Tuesday 2 PM peak engagement',
        'Create TikTok content during hot zone window'
      ]);
      setIsRefreshing(false);
    }, 1500);
  };

  // Auto-refresh every 30 seconds (simulating WebSocket + cache refresh)
  React.useEffect(() => {
    const interval = setInterval(refreshViViData, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = (reportId: string) => {
    setReadReports(prev => new Set([...Array.from(prev), reportId]));
  };

  const closeReport = () => {
    setSelectedReport(null);
  };

  return (
    <div className="space-y-4">
      {/* GTM Planning Cards - Equal Width Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Card 1: ViVi Daily Brief Dashboard - Enhanced */}
        <div className="p-8 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/60 rounded-3xl shadow-2xl border border-blue-100/60 min-h-[400px] hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">ViVi Daily Brief</h3>
                <p className="text-sm text-gray-600 font-medium">Real-Time System Sync • viviService.getAnalytics()</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={refreshViViData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  isRefreshing 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 border border-blue-200/50 shadow-inner hover:shadow-lg'
                }`}
              >
                {isRefreshing ? (
                  <>
                    <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Refresh Data</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {eodReports.map((report) => (
              <div
                key={report.id}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-400 hover:scale-[1.02] hover:shadow-xl group ${
                  report.status === 'unread'
                    ? 'bg-gradient-to-br from-purple-50 via-blue-50/30 to-indigo-50/40 border-purple-200/60 hover:from-purple-100/80 hover:to-indigo-100/60 shadow-lg'
                    : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/20 border-gray-200/60 hover:from-gray-100/80 hover:to-blue-50/40 shadow-md'
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-2 min-w-0 flex-1">
                    {report.urgent && (
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mt-1.5 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-gray-900 font-medium text-sm leading-tight break-words">{report.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{report.type} • {report.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {report.status === 'unread' && (
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white text-xs font-bold rounded-2xl whitespace-nowrap shadow-lg border border-purple-400/50">
                        NEW
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(report.id);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 text-blue-800 text-xs font-bold rounded-2xl hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 whitespace-nowrap shadow-md border border-blue-200/50 group-hover:shadow-lg"
                    >
                      {report.status === 'read' ? '✓ Read' : 'Mark Read'}
                    </button>
                  </div>
                </div>
                
                {selectedReport === report.id && (
                  <div className="mt-3 p-3 bg-gray-100 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-gray-900 font-medium text-sm">Report Details</h5>
                      <button
                        onClick={closeReport}
                        className="text-gray-500 hover:text-gray-700 text-sm font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1 text-xs">
                      {Object.entries(report.data).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-gray-900 font-medium">{Array.isArray(value) ? value.join(', ') : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* ViVi Recommendations Button - Routes to Mavro Magic Studio */}
          <div className="mt-6 pt-6 border-t border-blue-200/50">
            <button 
              onClick={() => setActiveSubTab('mavro-magic')}
              className="w-full py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-black rounded-2xl hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105 border border-purple-400/50 text-sm"
            >
              ✨ ViVi Recommendations → Mavro Magic Studio™
            </button>
            {viviRecommendations.length > 0 && (
              <div className="mt-3 space-y-2">
                {viviRecommendations.map((rec, i) => (
                  <div key={i} className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200/50">
                    • {rec}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Market Plan Progress Meter - Enhanced */}
        <div className="p-8 bg-gradient-to-br from-white via-green-50/40 to-emerald-50/60 rounded-3xl shadow-2xl border border-green-100/60 min-h-[400px] hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Market Plan Progress</h3>
                <p className="text-sm text-gray-600 font-medium">Scheduler + FourSIGHT • ViViBoostEngine()</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-sm text-green-700 font-bold bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-2xl border border-green-200/50 shadow-inner">
                scheduledPosts.json • Live Sync
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 tracking-tight">{marketProgress}%</div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="relative w-full h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-8 shadow-inner border border-gray-200/50">
            <div 
              className="h-7 bg-gradient-to-r from-green-400 via-emerald-500 to-blue-500 rounded-2xl transition-all duration-1000 shadow-lg relative overflow-hidden"
              style={{ width: `${marketProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/50 via-transparent to-blue-300/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-white drop-shadow-lg">{marketProgress}% Complete</span>
            </div>
          </div>

          {/* Progress Breakdown */}
          {/* Milestone Progress with Interactive Hover */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { milestone: 'Momentum', threshold: 25, achieved: marketProgress >= 25, color: 'from-blue-400 to-blue-500' },
              { milestone: 'Consistency', threshold: 50, achieved: marketProgress >= 50, color: 'from-green-400 to-green-500' },
              { milestone: 'Optimization', threshold: 75, achieved: marketProgress >= 75, color: 'from-orange-400 to-orange-500' },
              { milestone: 'Market Saturation', threshold: 100, achieved: marketProgress >= 100, color: 'from-purple-400 to-purple-500' }
            ].map((milestone, i) => (
              <div key={i} className={`p-3 rounded-2xl border transition-all duration-300 ${
                milestone.achieved 
                  ? 'bg-gradient-to-r ' + milestone.color + ' text-white shadow-lg' 
                  : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
                <div className="text-sm font-bold">{milestone.milestone}</div>
                <div className="text-xs opacity-80">{milestone.threshold}%</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              { category: 'Posts Published', progress: 85, count: '17/20 posts', boost: '+5% from yesterday\'s video reel reach increase' },
              { category: 'Scheduled Successfully', progress: 60, count: '3/5 campaigns', boost: 'BoostPanel auto-boosted 2 posts' },
              { category: 'Reviews Responded', progress: 75, count: '6/8 platforms', boost: 'FourSIGHT metrics triggered refresh' },
              { category: 'CRM Leads Updated', progress: 90, count: '27/30 assets', boost: 'Momentum score increased' }
            ].map((item, i) => (
              <div key={i} className="space-y-2 p-3 bg-white/60 rounded-lg border border-gray-100 group hover:bg-white hover:shadow-lg transition-all duration-300" title={item.boost}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">{item.category}</span>
                  <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-full text-xs">{item.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full shadow-inner">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${item.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.boost}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: Market Timeline View - Interactive Visual Planner */}
      <div className="p-8 bg-gradient-to-br from-white via-purple-50/40 to-pink-50/60 rounded-3xl shadow-2xl border border-purple-100/60 min-h-[400px] hover:shadow-3xl hover:scale-[1.01] transition-all duration-500 backdrop-blur-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Market Timeline View</h3>
            <p className="text-sm text-gray-600 font-medium">scheduledPosts.json • TrendTapFeed.jsx • ViViContext.marketInsights</p>
          </div>
        </div>

        {/* Interactive Timeline - Expanded Full Width Layout */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {[
              { date: '8/12', platform: 'instagram', type: 'reel', title: 'Morning Motivation', trend: 'Hot Zone Start', color: 'from-pink-500 to-red-500' },
              { date: '8/13', platform: 'linkedin', type: 'carousel', title: 'Industry Insights', trend: 'Professional Peak', color: 'from-blue-500 to-indigo-500' },
              { date: '8/14', platform: 'tiktok', type: 'video', title: 'Behind Scenes', trend: 'Viral Window', color: 'from-purple-500 to-pink-500' },
              { date: '8/15', platform: 'youtube', type: 'long-form', title: 'Deep Dive Content', trend: 'Educational Focus', color: 'from-red-500 to-orange-500' },
              { date: '8/16', platform: 'instagram', type: 'story', title: 'Quick Update', trend: 'Hot Zone End', color: 'from-green-500 to-emerald-500' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col h-full">
                <div className="relative flex-1">
                  {/* Timeline Connection Line */}
                  {i < 4 && (
                    <div className="hidden lg:block absolute top-6 left-full w-6 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 z-0"></div>
                  )}
                  
                  {/* Date Marker - Larger */}
                  <div className={`relative mx-auto w-16 h-16 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center text-white font-black text-lg shadow-xl mb-6 z-10 hover:scale-110 transition-all duration-300`}>
                    {item.date}
                  </div>
                  
                  {/* Content Card - Expanded */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] h-full flex flex-col">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      {item.platform === 'instagram' && <SiInstagram className="w-6 h-6 text-pink-500" />}
                      {item.platform === 'linkedin' && <SiLinkedin className="w-6 h-6 text-blue-600" />}
                      {item.platform === 'tiktok' && <SiTiktok className="w-6 h-6 text-black" />}
                      {item.platform === 'youtube' && <SiYoutube className="w-6 h-6 text-red-600" />}
                      <span className="text-sm font-bold text-gray-700 capitalize bg-gray-100 px-3 py-1 rounded-full">{item.type}</span>
                    </div>
                    
                    <h4 className="text-lg font-black text-gray-900 mb-3 text-center leading-tight">{item.title}</h4>
                    
                    <div className="text-sm text-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-2xl text-center font-medium border border-purple-100 mb-4 flex-1 flex items-center justify-center">
                      {item.trend}
                    </div>
                    
                    <button 
                      onClick={() => {
                        setPreviewPost(item);
                        setShowPreviewModal(true);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-black rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group-hover:shadow-lg hover:scale-105 border border-purple-400/50"
                    >
                      Preview Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Button - Single Centered with Clear Spacing */}
          <div className="w-full flex justify-center mt-12 pt-8 border-t border-purple-100/60">
            <button 
              onClick={() => setActiveSubTab('scheduler')}
              className="relative z-10 px-8 py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-black rounded-2xl hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-purple-400/50 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Add to Plan → Scheduler</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 4: Live ViVi Insights & Actions - Enhanced Full width */}
      <div className="p-8 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/60 rounded-3xl shadow-2xl border border-orange-100/60 min-h-[280px] hover:shadow-3xl hover:scale-[1.01] transition-all duration-500 backdrop-blur-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Live ViVi Insights & Actions</h3>
            <p className="text-sm text-gray-600 font-medium">Real-time AI Intelligence & Recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group ${
                insight.type === 'urgent' ? 'bg-gradient-to-br from-red-50 via-red-25 to-pink-50/40 border-red-200/60 hover:from-red-100 hover:to-pink-100 shadow-lg' :
                insight.type === 'opportunity' ? 'bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50/40 border-green-200/60 hover:from-green-100 hover:to-teal-100 shadow-lg' :
                'bg-gradient-to-br from-blue-50 via-indigo-25 to-purple-50/40 border-blue-200/60 hover:from-blue-100 hover:to-purple-100 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-2 text-xs font-black rounded-2xl shadow-lg border ${
                  insight.type === 'urgent' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-400/50' :
                  insight.type === 'opportunity' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400/50' :
                  'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400/50'
                }`}>
                  {insight.type.toUpperCase()}
                </span>
                <span className="text-xs text-gray-600 font-bold bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-2xl border border-gray-200/50 shadow-inner">{insight.timestamp}</span>
              </div>
              
              <p className="text-gray-900 text-sm mb-5 font-medium leading-relaxed">{insight.message}</p>
              
              {insight.actionable && (
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white text-sm font-black rounded-2xl hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105 border border-purple-400/50">
                  ⚡ Take Action
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Real-time Update Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 border border-green-200/60 text-green-800 rounded-3xl text-sm font-black shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse" />
              <div className="absolute -inset-1 w-5 h-5 bg-green-400/30 rounded-full animate-ping" />
            </div>
            <span>🔴 Live Updates Active</span>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};



// Scheduler Component
interface SchedulerContentProps {
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  setActiveSubTab: (tab: string) => void;
  previewPost: any;
  setPreviewPost: (post: any) => void;
  showPreviewModal: boolean;
  setShowPreviewModal: (show: boolean) => void;
}

const SchedulerContent: React.FC<SchedulerContentProps> = ({ selectedPlatforms, setSelectedPlatforms, setActiveSubTab, previewPost, setPreviewPost, showPreviewModal, setShowPreviewModal }) => {
  const [viewMode, setViewMode] = useState('calendar');

  const schedulerStats = {
    scheduledPosts: 24,
    autoOptimization: '87%',
    bestTimeSlots: 8,
    weeklyReach: '45.2K'
  };

  return (
    <div className="space-y-6">
      {/* Scheduler Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border border-blue-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{schedulerStats.scheduledPosts}</p>
              <p className="text-sm text-gray-600 font-medium">Scheduled Posts</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 border border-green-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{schedulerStats.autoOptimization}</p>
              <p className="text-sm text-gray-600 font-medium">Auto Optimization</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 border border-purple-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{schedulerStats.bestTimeSlots}</p>
              <p className="text-sm text-gray-600 font-medium">Best Time Slots</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 border border-orange-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{schedulerStats.weeklyReach}</p>
              <p className="text-sm text-gray-600 font-medium">Weekly Reach</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex space-x-2 p-2 bg-gradient-to-r from-gray-50 via-white to-purple-50/30 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl w-fit">
        {[
          { id: 'calendar', label: 'Enhanced Calendar', icon: Calendar },
          { id: 'autopilot', label: 'AutoPilot', icon: Sparkles }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-400 ${
              viewMode === mode.id
                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-xl border border-purple-400/50 transform scale-105'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-100/50 hover:shadow-lg hover:scale-102'
            }`}
          >
            <mode.icon className="w-5 h-5" />
            <span className="text-sm font-black tracking-tight">{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on view mode */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden" style={{ height: '700px', contain: 'layout style paint' }}>
          <div className="h-full flex flex-col overflow-hidden">
            <EnhancedScheduler />
          </div>
        </div>
      )}

      {viewMode === 'autopilot' && (
        <NewAutoPilotDashboard />
      )}
    </div>
  );
};

// Marvo Magic Studio Content Component
const MavroMagicStudioContent: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(1);
  const [wizardState, setWizardState] = useState({
    contentUploads: [],
    platforms: {},
    selectedPlatforms: [] as string[],
    captions: {},
    audioSelections: {},
    hashtags: {},
    previews: {},
    campaignQueue: [] as any[],
    savedWizards: {}
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // Platform configurations
  const PLATFORMS = {
    instagram: { name: 'Instagram', postTypes: ['Post', 'Reel', 'Story'], color: 'from-pink-500 to-purple-600', icon: SiInstagram },
    x: { name: 'X (Twitter)', postTypes: ['Post', 'Thread'], color: 'from-gray-800 to-black', icon: SiX },
    linkedin: { name: 'LinkedIn', postTypes: ['Post', 'Article'], color: 'from-blue-600 to-blue-800', icon: SiLinkedin },
    tiktok: { name: 'TikTok', postTypes: ['Video', 'Slideshow'], color: 'from-black to-gray-800', icon: SiTiktok },
    facebook: { name: 'Facebook', postTypes: ['Post', 'Story', 'Reel'], color: 'from-blue-500 to-blue-700', icon: SiFacebook },
    youtube: { name: 'YouTube', postTypes: ['Video', 'Short', 'Community'], color: 'from-red-500 to-red-700', icon: SiYoutube }
  };

  // Platform selection handler
  const togglePlatformSelection = (platformKey: string) => {
    setWizardState(prev => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.includes(platformKey)
        ? prev.selectedPlatforms.filter(p => p !== platformKey)
        : [...prev.selectedPlatforms, platformKey]
    }));
  };

  // Card 1: Content Upload & Platform Configuration
  const renderCard1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Content Upload & Platform Setup</h2>
        <p className="text-gray-600 text-lg">Choose your creative assets and target platforms</p>
      </div>

      {/* Upload Builder Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Share2, title: 'Social Media Post', desc: 'Create engaging social content', gradient: 'from-blue-500 to-indigo-600' },
          { icon: Video, title: 'Video Script Builder', desc: 'Generate video scripts & storyboards', gradient: 'from-purple-500 to-pink-600' },
          { icon: Mail, title: 'Email Campaigns', desc: 'Design email marketing campaigns', gradient: 'from-green-500 to-emerald-600' },
          { icon: FileText, title: 'Blog Articles', desc: 'Write comprehensive blog content', gradient: 'from-orange-500 to-amber-600' }
        ].map((item) => (
          <div key={item.title} className="relative group cursor-pointer">
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-2xl p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-black tracking-tight text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center shadow-xl transition-all duration-300 hover:border-blue-400 hover:shadow-2xl">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-black tracking-tight text-gray-900 mb-3">Drag & Drop Your Creative Assets</h3>
        <p className="text-gray-600 mb-4">Upload images, videos, or documents to get started</p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300">
          Browse Files
        </button>
      </div>

      {/* Platform Selection */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-6">Select Target Platforms</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(PLATFORMS).map(([key, platform]) => {
            const IconComponent = platform.icon;
            const isSelected = wizardState.selectedPlatforms.includes(key);
            return (
              <div 
                key={key} 
                className="relative group cursor-pointer"
                onClick={() => togglePlatformSelection(key)}
              >
                <div className={`bg-gradient-to-br ${platform.color} text-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${isSelected ? 'ring-4 ring-white shadow-2xl scale-105' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-6 h-6 text-white" />
                      <h4 className="font-bold text-lg">{platform.name}</h4>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {platform.postTypes.map((type) => (
                      <span key={type} className="text-xs bg-white/20 px-2 py-1 rounded-lg">{type}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Card 2: AI-Powered Caption & Audio/Hashtag Builder
  const renderCard2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">AI Generation</h2>
        <p className="text-gray-600 text-lg">ViViCaptionBuilder • TrendTap Lite™ • SoundLibraryFetcher</p>
        <p className="text-gray-500">Persona-Aware Content Creation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Caption Builder */}
        <div className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-200 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-gray-900">ViViCaptionBuilder</h3>
                <p className="text-sm text-purple-600 font-medium">Persona-Aware NLP + Tone Selection</p>
              </div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group">
              <Mic className="w-6 h-6 text-white group-hover:animate-pulse" />
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Caption</span>
            <span className="text-sm text-gray-500">0 / 5350</span>
          </div>
          <textarea
            className="w-full h-32 p-4 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Write your engaging caption here... Tell your story, share your thoughts, or inspire your audience!"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">AI suggestions available</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-bold hover:scale-105 transition-all duration-300">
                Make it local
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl text-sm font-bold hover:scale-105 transition-all duration-300">
                Add humor
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-bold hover:scale-105 transition-all duration-300">
                Be inspirational
              </button>
            </div>
          </div>
        </div>

        {/* Audio Selector & Hashtags */}
        <div className="space-y-6">
          {/* Audio Selector */}
          <div className="bg-gradient-to-br from-white to-green-50/30 border border-green-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                <Music className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-black tracking-tight text-gray-900">SoundLibraryFetcher</h3>
            </div>
            
            {/* Platform-Specific Trending Audio */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-white group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center">
                  <SiInstagram className="w-5 h-5 mr-3" />
                  <div>
                    <span className="font-medium block">Instagram - Trending Audio</span>
                    <span className="text-xs opacity-75">"Summer Vibes 2024" • 2.4M uses</span>
                  </div>
                </div>
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-2xl text-white group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center">
                  <SiTiktok className="w-5 h-5 mr-3" />
                  <div>
                    <span className="font-medium block">TikTok - Viral Sound</span>
                    <span className="text-xs opacity-75">"Original Audio" • 890K uses</span>
                  </div>
                </div>
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Trending Hashtags Preview */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black tracking-tight text-gray-900">Trending Hashtags</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-600 font-medium">TrendTap Lite™ • Live Feed</span>
              </div>
            </div>

            {/* Real-Time Trending Hashtags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { tag: "#LocalBusiness", trend: "+45%", color: "from-green-500 to-emerald-600" },
                  { tag: "#SmallBizLife", trend: "+32%", color: "from-blue-500 to-indigo-600" },
                  { tag: "#CommunityFirst", trend: "+28%", color: "from-purple-500 to-pink-600" },
                  { tag: "#SupportLocal", trend: "+15%", color: "from-orange-500 to-amber-600" }
                ].map((hashtag, i) => (
                  <div key={i} className={`px-3 py-2 bg-gradient-to-r ${hashtag.color} text-white rounded-lg text-sm font-bold cursor-pointer hover:scale-105 transition-all duration-300 group`}>
                    <span className="block">{hashtag.tag}</span>
                    <span className="text-xs opacity-75">{hashtag.trend}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-xl text-sm font-bold hover:from-blue-200 hover:to-indigo-200 transition-all duration-300">
                🎯 Generate More Hashtags
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Content Suggestions */}
      <div className="bg-gradient-to-br from-white to-orange-50/30 border border-orange-200 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mr-4 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">AI Content Suggestions</h3>
        </div>
        
        <div className="flex space-x-2 mb-6">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold shadow-lg">Hook</button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300">CTA</button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300">Story</button>
        </div>

        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-700 mb-4">Ready to transform your industry experience? Here's what makes us different...</p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm font-medium">High Engagement</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm font-medium">Professional</span>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300">Use This</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Card 3: Scaled Content Preview
  const renderCard3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Content Previews</h2>
        <p className="text-gray-600 text-lg">See how your content will look across platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(PLATFORMS).slice(0, 6).map(([key, platform]) => (
          <div key={key} className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black tracking-tight text-gray-900">{platform.name}</h3>
              <button className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-300">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            {/* Platform-specific preview mockup */}
            <div className={`aspect-square ${key === 'x' ? 'aspect-video' : ''} bg-gradient-to-br ${platform.color} rounded-2xl mb-4 flex items-center justify-center text-white font-bold shadow-lg`}>
              Content Preview
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 line-clamp-2">Sample caption text for {platform.name} will appear here with proper formatting...</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">#sample</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">#hashtag</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Card 4: Publish, Schedule & Save Options
  const renderCard4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Publish & Schedule</h2>
        <p className="text-gray-600 text-lg">Choose how to deploy your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            title: 'Post Now', 
            desc: 'Publish immediately across all platforms', 
            icon: Share2, 
            gradient: 'from-green-500 to-emerald-600',
            action: () => handlePublish('now')
          },
          { 
            title: 'Add to Campaign', 
            desc: 'Queue with other content for batch publishing', 
            icon: Check, 
            gradient: 'from-blue-500 to-indigo-600',
            action: () => handlePublish('campaign')
          },
          { 
            title: 'Schedule for Later', 
            desc: 'Set specific date and time for publishing', 
            icon: Calendar, 
            gradient: 'from-purple-500 to-pink-600',
            action: () => handlePublish('schedule')
          },
          { 
            title: 'Save for Later', 
            desc: 'Save progress and return to complete later', 
            icon: Save, 
            gradient: 'from-orange-500 to-amber-600',
            action: () => handleSave()
          }
        ].map((option) => (
          <div key={option.title} className="relative group cursor-pointer" onClick={option.action}>
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tight text-gray-900 mb-3">{option.title}</h3>
              <p className="text-gray-600">{option.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Handle publishing actions
  const handlePublish = (type: 'now' | 'campaign' | 'schedule') => {
    if (type === 'now') {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        resetWizard();
      }, 3000);
    } else if (type === 'campaign') {
      setWizardState(prev => ({
        ...prev,
        campaignQueue: [...prev.campaignQueue, { id: Date.now(), ...prev }]
      }));
      resetWizard();
    } else if (type === 'schedule') {
      resetWizard();
    }
  };

  // Handle save for later
  const handleSave = () => {
    const wizardId = `wizard_${Date.now()}`;
    setWizardState(prev => ({
      ...prev,
      savedWizards: { ...prev.savedWizards, [wizardId]: { ...prev } }
    }));
  };

  // Reset wizard to initial state
  const resetWizard = () => {
    setCurrentCard(1);
    setWizardState({
      contentUploads: [],
      platforms: {},
      selectedPlatforms: [],
      captions: {},
      audioSelections: {},
      hashtags: {},
      previews: {},
      campaignQueue: [] as any[],
      savedWizards: wizardState.savedWizards
    });
  };

  // Celebration animation
  const CelebrationModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-12 max-w-md mx-4 text-center shadow-3xl">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-4">🎉 Posts Are Live!</h2>
        <p className="text-gray-600 text-lg">Your content has been successfully published across all selected platforms.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl">
      {/* Ultra-Enhanced Wizard Flow Bar */}
      <div className="mb-16 px-4">
        <div className="relative bg-gradient-to-br from-white via-gray-50 to-purple-50/30 rounded-3xl p-8 shadow-2xl border border-gray-100/50">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 rounded-3xl opacity-5 bg-gradient-to-br from-purple-100 via-transparent to-pink-100" />
          
          {/* Main Progress Line Container */}
          <div className="relative mb-8">
            {/* Progress Background Track */}
            <div className="absolute top-8 left-20 right-20 h-2 bg-gradient-to-r from-gray-100 via-gray-150 to-gray-100 rounded-full shadow-inner" 
                 style={{boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'}} />
            
            {/* Active Progress Fill */}
            <div 
              className="absolute top-8 left-20 h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full shadow-lg transition-all duration-700 ease-out"
              style={{ 
                width: `${Math.max(0, ((currentCard - 1) / 3) * (100 - 160/4))}%`,
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 4px 12px rgba(168, 85, 247, 0.2)'
              }}
            />
            
            {/* Animated Progress Glow */}
            {currentCard > 1 && (
              <div 
                className="absolute top-8 left-20 h-2 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full animate-pulse"
                style={{ width: `${((currentCard - 1) / 3) * (100 - 160/4)}%` }}
              />
            )}
          </div>
          
          {/* Enhanced Step Cards */}
          <div className="relative flex justify-between items-start">
            {[
              { 
                step: 1, 
                title: 'Upload & Setup', 
                desc: 'Content & Platforms',
                detail: 'Drag files, select platforms',
                icon: Upload,
                color: 'purple'
              },
              { 
                step: 2, 
                title: 'AI Generation', 
                desc: 'Captions & Audio',
                detail: 'Smart content creation',
                icon: Sparkles,
                color: 'indigo'
              },
              { 
                step: 3, 
                title: 'Preview', 
                desc: 'Multi-Platform View',
                detail: 'Review before publishing',
                icon: Image,
                color: 'pink'
              },
              { 
                step: 4, 
                title: 'Publish', 
                desc: 'Deploy Content',
                detail: 'Go live across platforms',
                icon: Share2,
                color: 'emerald'
              }
            ].map(({ step, title, desc, detail, icon: Icon, color }) => (
              <div key={step} className="relative flex flex-col items-center group cursor-pointer w-44" onClick={() => setCurrentCard(step)}>
                
                {/* Enhanced Step Circle */}
                <div className="relative mb-6">
                  <div
                    className={`relative w-16 h-16 rounded-3xl flex items-center justify-center font-black text-xl shadow-2xl transition-all duration-500 transform group-hover:scale-110 ${
                      step === currentCard
                        ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white scale-110 shadow-purple-500/60 ring-4 ring-purple-200/60'
                        : step < currentCard
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/40 hover:shadow-green-500/60'
                        : 'bg-gradient-to-br from-white to-gray-50 text-gray-400 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
                    }`}
                  >
                    {step < currentCard ? (
                      <Check className="w-8 h-8" />
                    ) : step === currentCard ? (
                      <Icon className="w-8 h-8" />
                    ) : (
                      <span className="font-black text-xl">{step}</span>
                    )}
                    
                    {/* Multi-Layer Pulse Effect for Active Step */}
                    {step === currentCard && (
                      <>
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse opacity-30" />
                        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-ping" />
                      </>
                    )}
                  </div>
                  
                  {/* Enhanced Completion Badge */}
                  {step < currentCard && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  {/* Current Step Indicator with Glow */}
                  {step === currentCard && (
                    <>
                      <div className="absolute -bottom-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce shadow-lg" />
                      <div className="absolute -bottom-4 w-6 h-6 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full animate-ping" />
                    </>
                  )}
                </div>
                
                {/* Enhanced Step Labels with Card Design */}
                <div className={`text-center w-full p-4 rounded-2xl transition-all duration-400 ${
                  step === currentCard 
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg' 
                    : step < currentCard 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-md'
                    : 'bg-white/70 border border-gray-200 group-hover:bg-gradient-to-br group-hover:from-purple-50/50 group-hover:to-pink-50/50 group-hover:border-purple-200'
                }`}>
                  
                  {/* Main Title */}
                  <div className={`font-black text-base tracking-tight transition-all duration-300 mb-2 ${
                    step === currentCard 
                      ? 'text-purple-800' 
                      : step < currentCard 
                      ? 'text-green-800' 
                      : 'text-gray-600 group-hover:text-purple-700'
                  }`}>
                    {title}
                  </div>
                  
                  {/* Subtitle */}
                  <div className={`text-sm font-semibold transition-all duration-300 mb-1 ${
                    step === currentCard 
                      ? 'text-purple-600' 
                      : step < currentCard 
                      ? 'text-green-600' 
                      : 'text-gray-500 group-hover:text-purple-600'
                  }`}>
                    {desc}
                  </div>
                  
                  {/* Detail Description */}
                  <div className={`text-xs font-medium transition-all duration-300 ${
                    step === currentCard 
                      ? 'text-purple-500' 
                      : step < currentCard 
                      ? 'text-green-500' 
                      : 'text-gray-400 group-hover:text-purple-500'
                  }`}>
                    {detail}
                  </div>
                  
                  {/* Step Status Indicator */}
                  <div className={`mt-3 w-full h-1.5 rounded-full transition-all duration-300 ${
                    step === currentCard 
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                      : step < currentCard 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                      : 'bg-gray-200 group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Ultra-Enhanced Progress Status Panel */}
          <div className="mt-10 flex justify-center">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-pink-200/30 to-purple-200/30 rounded-3xl blur-xl" />
              
              {/* Main Panel */}
              <div className="relative inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-white via-purple-50/50 to-pink-50/50 border-2 border-purple-200/50 text-purple-900 rounded-3xl text-base font-black shadow-2xl backdrop-blur-sm">
                
                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  <div className="relative w-4 h-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin" 
                         style={{animationDuration: '3s'}} />
                    <div className="absolute inset-1 bg-white rounded-full" />
                  </div>
                  <span className="font-black tracking-tight">
                    Step {currentCard} of 4
                  </span>
                </div>
                
                {/* Separator */}
                <div className="w-1 h-6 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full" />
                
                {/* Progress Percentage */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {Math.round(((currentCard - 1) / 3) * 100)}%
                  </span>
                  <span className="font-black tracking-tight">Complete</span>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentCard === 4 
                      ? 'bg-green-500 animate-bounce shadow-lg shadow-green-500/50' 
                      : 'bg-orange-500 animate-pulse shadow-lg shadow-orange-500/50'
                  }`} />
                  <span className="text-sm font-bold">
                    {currentCard === 4 ? 'Ready to Publish!' : 'In Progress...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      {currentCard === 1 && renderCard1()}
      {currentCard === 2 && renderCard2()}
      {currentCard === 3 && renderCard3()}
      {currentCard === 4 && renderCard4()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={() => setCurrentCard(Math.max(1, currentCard - 1))}
          disabled={currentCard === 1}
          className={`px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
            currentCard === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:scale-105'
          }`}
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentCard(Math.min(4, currentCard + 1))}
          disabled={currentCard === 4}
          className={`px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
            currentCard === 4
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105'
          }`}
        >
          {currentCard === 4 ? 'Complete' : 'Next'}
        </button>
      </div>

      {/* Celebration Modal */}
      {showCelebration && <CelebrationModal />}
    </div>
  );
};

export default PlanTab;