import React, { useState } from 'react';
import { BarChart3, MessageSquare, Star, Users, TrendingUp, Eye, Clock, Hash } from 'lucide-react';
import NewCampaignSuccess from '../NewViViComponents/CampaignSuccessDashboard';
// Removed CRMandReviewPanel import due to ViVi provider dependency

const TrackTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  const performanceData = {
    totalReach: '42.8K',
    engagement: '8.2%',
    clicks: '1,247',
    conversions: '89',
    revenue: '$4,520',
    avgEngagement: '+12.5%'
  };

  const recentPosts = [
    {
      id: 1,
      content: "Summer skincare tips for glowing skin ✨",
      platform: "instagram",
      views: 12400,
      engagement: 156,
      time: "2h ago",
      performance: "excellent"
    },
    {
      id: 2,
      content: "Transform your home with these cleaning hacks",
      platform: "tiktok", 
      views: 8900,
      engagement: 89,
      time: "4h ago",
      performance: "good"
    },
    {
      id: 3,
      content: "Real estate market insights for 2025",
      platform: "linkedin",
      views: 3200,
      engagement: 45,
      time: "6h ago",
      performance: "average"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <div className="p-5 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Total Reach</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{performanceData.totalReach}</p>
          <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">+15.2% vs last week</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Engagement</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{performanceData.engagement}</p>
          <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">{performanceData.avgEngagement}</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Clicks</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{performanceData.clicks}</p>
          <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">+8.7% vs last week</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-white to-yellow-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Conversions</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{performanceData.conversions}</p>
          <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">+22.1% vs last week</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-white to-pink-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <BarChart3 className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{performanceData.revenue}</p>
          <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">+18.9% vs last week</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Hash className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Avg. Engagement</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">4.2K</p>
          <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">+12.5% vs last week</p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-gray-900 font-bold">Time Range:</span>
        <div className="flex space-x-1 p-1 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl shadow-sm">
          {[
            { id: '24h', label: '24 Hours' },
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeRange === range.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 p-1 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
        {[
          { id: 'overview', label: 'Performance Overview', icon: BarChart3 },
          { id: 'campaigns', label: 'Campaign Success', icon: TrendingUp },
          { id: 'reviews', label: 'Reviews & CRM', icon: MessageSquare },
          { id: 'hashtags', label: 'Hashtag Analytics', icon: Hash }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Posts Performance */}
          <div className="p-6 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <span>Recent Posts</span>
            </h3>
            
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm font-medium mb-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="capitalize text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">{post.platform}</span>
                        <span className="text-gray-500">{post.time}</span>
                        <span className={`px-3 py-1 rounded-full font-medium ${
                          post.performance === 'excellent' ? 'bg-green-100 text-green-700' :
                          post.performance === 'good' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {post.performance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-700 font-medium">
                        <Eye className="w-4 h-4 inline mr-1 text-blue-500" />
                        {post.views.toLocaleString()}
                      </span>
                      <span className="text-gray-700 font-medium">
                        <TrendingUp className="w-4 h-4 inline mr-1 text-purple-500" />
                        {post.engagement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="p-6 bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <span>Engagement Trends</span>
            </h3>
            
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-inner">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 font-medium">Interactive engagement chart</p>
                <p className="text-gray-500 text-sm">Real-time analytics visualization</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'campaigns' && (
        <NewCampaignSuccess
          content="Sample campaign content"
          posts={recentPosts}
        />
      )}

      {activeSection === 'reviews' && (
        <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <span>Reviews & CRM Management</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Recent Reviews</h4>
              <div className="space-y-3">
                {[
                  { author: 'Sarah Johnson', rating: 5, text: 'Absolutely amazing service! Highly recommend.', time: '2 hours ago', platform: 'Google' },
                  { author: 'Michael Chen', rating: 4, text: 'Great experience, will definitely return.', time: '1 day ago', platform: 'Facebook' },
                  { author: 'Emily Davis', rating: 5, text: 'Professional and efficient. Love the results!', time: '3 days ago', platform: 'Yelp' }
                ].map((review, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{review.author}</span>
                        <div className="flex space-x-1">
                          {Array.from({ length: review.rating }, (_, j) => (
                            <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.platform}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">"{review.text}"</p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{review.time}</span>
                      <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors">
                        Auto Response
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">CRM Activity</h4>
              <div className="space-y-3">
                {[
                  { contact: 'Jennifer Lopez', action: 'Follow-up scheduled', status: 'pending', time: '30 min ago' },
                  { contact: 'Robert Smith', action: 'Proposal sent', status: 'completed', time: '2 hours ago' },
                  { contact: 'Lisa Anderson', action: 'Initial consultation', status: 'completed', time: '1 day ago' }
                ].map((activity, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{activity.contact}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{activity.action}</p>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'hashtags' && (
        <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Hash className="w-5 h-5 text-pink-400" />
            <span>Hashtag Performance Analytics</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Top Performing Hashtags</h4>
              <div className="space-y-3">
                {[
                  { tag: 'leadership', engagement: 4250, posts: 12, trend: 'up' },
                  { tag: 'marketing', engagement: 3890, posts: 8, trend: 'up' },
                  { tag: 'business', engagement: 3200, posts: 15, trend: 'stable' },
                  { tag: 'growth', engagement: 2950, posts: 6, trend: 'up' },
                  { tag: 'success', engagement: 2100, posts: 9, trend: 'down' }
                ].map((hashtag, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-pink-400 font-medium">#{hashtag.tag}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        hashtag.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                        hashtag.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {hashtag.trend === 'up' ? '↗' : hashtag.trend === 'down' ? '↘' : '→'}
                      </span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-white font-medium">{hashtag.engagement.toLocaleString()}</div>
                      <div className="text-gray-400">{hashtag.posts} posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Trending Opportunities</h4>
              <div className="space-y-3">
                {[
                  { tag: 'AI2025', potential: 'Very High', competition: 'Low' },
                  { tag: 'digitalmarketing', potential: 'High', competition: 'Medium' },
                  { tag: 'entrepreneur', potential: 'Medium', competition: 'High' },
                  { tag: 'innovation', potential: 'High', competition: 'Low' }
                ].map((opp, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-medium">#{opp.tag}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        opp.potential === 'Very High' ? 'bg-green-500/20 text-green-400' :
                        opp.potential === 'High' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {opp.potential}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Competition: {opp.competition}</span>
                      <span>Recommended</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackTab;