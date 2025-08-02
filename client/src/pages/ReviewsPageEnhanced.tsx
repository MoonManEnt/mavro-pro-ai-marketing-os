import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, MessageSquare, AlertCircle, CheckCircle, Clock, Filter, Search, Reply, Flag, Heart, Share2, MoreHorizontal, ThumbsUp, ThumbsDown, Sparkles, Target, Calendar, Users, BarChart3, Award, MapPin, Zap, Send, Edit, Trash2, Eye, RefreshCw, Download, Grid3X3, List, Settings, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReviewResponses } from '../hooks/useReviewResponses';
import { PlatformIcon, getPlatformColor } from '../components/ui/PlatformIcon';

interface Review {
  id: string;
  customerName: string;
  customerInitials: string;
  rating: number;
  date: string;
  platform: 'google' | 'facebook' | 'yelp' | 'instagram' | 'linkedin' | 'x' | 'tiktok' | 'youtube';
  content: string;
  response?: string;
  responseDate?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
  helpful: number;
  persona: string;
  verified: boolean;
  location?: string;
  reviewType?: 'service' | 'product' | 'experience' | 'recommendation';
  linkedPost?: string;
  viviSuggestion?: string;
  responseStatus: 'pending' | 'approved' | 'posted' | 'ignored';
}

interface ReviewsPageProps {
  currentPersona: string;
}

const ReviewsPageEnhanced: React.FC<ReviewsPageProps> = ({ currentPersona }) => {
  // Use the provided hook for data management
  const { 
    reviews, 
    sendResponse, 
    generateViViResponse, 
    refreshReviews, 
    personaStyle,
    setReviews 
  } = useReviewResponses();
  
  // Simple demo mode detection without auth context
  const isDemoMode = localStorage.getItem('demoMode') === 'true';
  const actualBetaUser = !isDemoMode;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'all' | 'google' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'other'>('overview');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');
  const [showViViSidebar, setShowViViSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadReviews = async () => {
      if (actualBetaUser) {
        // For beta users, fetch from API
        try {
          await refreshReviews();
        } catch (error) {
          console.error('Failed to load reviews:', error);
        }
      }
      // Demo users already have data from the hook
    };

    loadReviews();
  }, [currentPersona, actualBetaUser, refreshReviews]);

  // Platform icons now handled by PlatformIcon component

  // Enhanced review response handler with ViVi integration
  const handleSendResponse = async (review: Review) => {
    setIsLoading(true);
    try {
      setSelectedReview(review);
      const result = await sendResponse(review.id);
      
      if (result.success) {
        console.log(`ViVi posted your response to ${review.platform}!`);
      } else {
        console.error('Failed to send response:', result.error);
      }
    } catch (error) {
      console.error('Failed to send response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle refresh reviews
  const handleRefreshReviews = async () => {
    setIsLoading(true);
    try {
      const result = await refreshReviews();
      if (result.success) {
        console.log('Reviews refreshed successfully');
      } else {
        console.error('Failed to refresh reviews:', result.error);
      }
    } catch (error) {
      console.error('Error refreshing reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tab animation variants
  const tabVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
  };

  // Card hover animation
  const cardVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Helper function to safely check if reviews is an array
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-700 bg-green-100 border-green-200';
      case 'negative': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'approved': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  // Filter reviews based on active tab
  const filteredReviews = safeReviews.filter(review => {
    if (activeTab === 'all' || activeTab === 'overview') return true;
    if (activeTab === 'other') return !['google', 'facebook', 'instagram', 'tiktok', 'youtube'].includes(review.platform);
    return review.platform === activeTab;
  });

  // Calculate stats
  const reviewStats = {
    total: safeReviews.length,
    positive: safeReviews.filter(r => r.sentiment === 'positive').length,
    negative: safeReviews.filter(r => r.sentiment === 'negative').length,
    neutral: safeReviews.filter(r => r.sentiment === 'neutral').length,
    averageRating: safeReviews.reduce((acc, r) => acc + (r.rating || 0), 0) / Math.max(safeReviews.length, 1),
    responseRate: (safeReviews.filter(r => r.response).length / Math.max(safeReviews.length, 1)) * 100,
    pendingResponses: safeReviews.filter(r => r.responseStatus === 'pending').length
  };

  // Platform-specific tabs
  const platformTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'all', label: 'All Reviews', icon: MessageSquare },
    { id: 'google', label: 'Google Business', icon: SiGoogle },
    { id: 'facebook', label: 'Facebook', icon: SiFacebook },
    { id: 'instagram', label: 'Instagram', icon: SiInstagram },
    { id: 'tiktok', label: 'TikTok', icon: SiTiktok },
    { id: 'youtube', label: 'YouTube', icon: SiYoutube },
    { id: 'other', label: 'Other', icon: MoreHorizontal }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto p-8">
        {/* Enhanced Header with Real-time Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center justify-center w-14 h-14 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Reviews Intelligence Hub</h1>
                <p className="text-gray-600 font-medium">Multi-platform review management with ViVi AI responses</p>
              </div>
            </div>

            {/* Control Panel */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setAutoResponseEnabled(!autoResponseEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                  autoResponseEnabled 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bot className="w-4 h-4" />
                Auto-Response: {autoResponseEnabled ? 'ON' : 'OFF'}
              </motion.button>

              <motion.button
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-700 font-medium hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {viewMode === 'list' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                {viewMode === 'list' ? 'Grid View' : 'List View'}
              </motion.button>

              <motion.button
                onClick={() => setShowViViSidebar(!showViViSidebar)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-2xl border border-purple-200 text-purple-700 font-medium hover:bg-purple-200 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                ViVi Suggestions
              </motion.button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-gray-900">{reviewStats.total}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-green-600">{reviewStats.positive}</div>
              <div className="text-sm text-gray-600">Positive</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-red-600">{reviewStats.negative}</div>
              <div className="text-sm text-gray-600">Needs Attention</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-yellow-600">{reviewStats.averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-blue-600">{reviewStats.responseRate.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-purple-600">{reviewStats.pendingResponses}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </motion.div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className={`${showViViSidebar ? 'flex-1' : 'w-full'} transition-all duration-300`}>
            {/* Platform Tabs */}
            <div className="mb-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-2">
                <div className="flex flex-wrap gap-2">
                  {platformTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const count = tab.id === 'all' ? reviewStats.total : 
                                 tab.id === 'overview' ? reviewStats.total :
                                 reviews.filter(r => r.platform === tab.id).length;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        {count > 0 && (
                          <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {count}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content Area with Animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'overview' ? (
                  // Overview Dashboard
                  <div className="space-y-8">
                    {/* Recent Reviews */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                      <div className="p-8 border-b border-gray-200/50">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Reviews</h2>
                        <p className="text-gray-600 font-medium">Latest customer feedback requiring attention</p>
                      </div>
                      <div className="p-8">
                        <div className="space-y-6">
                          {safeReviews.slice(0, 5).map((review) => (
                            <motion.div 
                              key={review.id}
                              className="p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                              variants={cardVariants}
                              whileHover="hover"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                    {review.customerInitials}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900">{review.customerName}</p>
                                    <div className="flex items-center space-x-2">
                                      <div className="flex">{renderStars(review.rating)}</div>
                                      <span className="text-sm text-gray-600">{review.date}</span>
                                      <PlatformIcon platform={review.platform} className="w-4 h-4" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getSentimentColor(review.sentiment)}`}>
                                    {review.sentiment}
                                  </span>
                                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(review.responseStatus)}`}>
                                    {review.responseStatus}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                              
                              {/* ViVi Suggestion */}
                              {review.viviSuggestion && (
                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200/50 mb-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Bot className="w-4 h-4 text-purple-600" />
                                    <p className="text-sm text-purple-900 font-medium">ViVi Suggested Response:</p>
                                  </div>
                                  <p className="text-purple-800 text-sm">{review.viviSuggestion}</p>
                                </div>
                              )}

                              {/* Response */}
                              {review.response && (
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/50 mb-4">
                                  <p className="text-sm text-blue-900 font-medium mb-1">Your Response:</p>
                                  <p className="text-blue-800 text-sm">{review.response}</p>
                                  <p className="text-xs text-blue-600 mt-2">Posted on {review.responseDate}</p>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                {review.responseStatus === 'pending' && (
                                  <motion.button
                                    onClick={() => handleSendResponse(review)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Send className="w-4 h-4" />
                                    Send ViVi Response
                                  </motion.button>
                                )}
                                <motion.button
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit Response
                                </motion.button>
                                <motion.button
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Eye className="w-4 h-4" />
                                  View Post
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Platform-specific Reviews
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    <div className="p-8 border-b border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                            {platformTabs.find(t => t.id === activeTab)?.label} Reviews
                          </h2>
                          <p className="text-gray-600 font-medium">{filteredReviews.length} reviews found</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl font-medium hover:bg-blue-200 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-2xl font-medium hover:bg-purple-200 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      {filteredReviews.length === 0 ? (
                        <div className="text-center py-12">
                          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg">No reviews found for this platform.</p>
                        </div>
                      ) : (
                        <div className={viewMode === 'grid' ? 
                          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
                          'space-y-6'
                        }>
                          {filteredReviews.map((review) => (
                            <motion.div 
                              key={review.id}
                              className="group p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                              variants={cardVariants}
                              whileHover="hover"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                    {review.customerInitials}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900">{review.customerName}</p>
                                    <div className="flex items-center space-x-2">
                                      <div className="flex">{renderStars(review.rating)}</div>
                                      <span className="text-sm text-gray-600">{review.date}</span>
                                      <PlatformIcon platform={review.platform} className="w-4 h-4" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getSentimentColor(review.sentiment)}`}>
                                    {review.sentiment}
                                  </span>
                                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(review.responseStatus)}`}>
                                    {review.responseStatus}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                              
                              {/* ViVi Suggestion */}
                              {review.viviSuggestion && (
                                <motion.div 
                                  className="p-4 bg-purple-50 rounded-xl border border-purple-200/50 mb-4"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <Bot className="w-4 h-4 text-purple-600" />
                                    <p className="text-sm text-purple-900 font-medium">ViVi Suggested Response:</p>
                                  </div>
                                  <p className="text-purple-800 text-sm">{review.viviSuggestion}</p>
                                </motion.div>
                              )}

                              {/* Response */}
                              {review.response && (
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/50 mb-4">
                                  <p className="text-sm text-blue-900 font-medium mb-1">Your Response:</p>
                                  <p className="text-blue-800 text-sm">{review.response}</p>
                                  <p className="text-xs text-blue-600 mt-2">Posted on {review.responseDate}</p>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <motion.div 
                                className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                              >
                                {review.responseStatus === 'pending' && (
                                  <motion.button
                                    onClick={() => handleSendResponse(review)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Send className="w-4 h-4" />
                                    Send ViVi Response
                                  </motion.button>
                                )}
                                <motion.button
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </motion.button>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ViVi Suggestions Sidebar */}
          <AnimatePresence>
            {showViViSidebar && (
              <motion.div
                className="w-80 bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-b border-gray-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900">ViVi Suggestions</h3>
                      <p className="text-sm text-gray-600">Smart response queue</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {reviews.filter(r => r.responseStatus === 'pending').slice(0, 3).map((review, index) => (
                    <motion.div
                      key={review.id}
                      className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <PlatformIcon platform={review.platform} className="w-4 h-4" />
                        <span className="text-sm font-medium text-gray-900">{review.customerName}</span>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{review.content}</p>
                      {review.viviSuggestion && (
                        <div className="bg-white p-3 rounded-xl border border-gray-200/50 mb-3">
                          <p className="text-xs text-gray-800">{review.viviSuggestion}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleSendResponse(review)}
                          className="flex-1 px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-xl hover:bg-green-600 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Approve & Send
                        </motion.button>
                        <motion.button
                          className="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-200 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Edit
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}

                  {reviews.filter(r => r.responseStatus === 'pending').length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">All responses sent!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPageEnhanced;