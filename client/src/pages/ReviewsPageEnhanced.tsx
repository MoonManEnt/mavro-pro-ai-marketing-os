import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, MessageSquare, AlertCircle, CheckCircle, Clock, Filter, Search, Reply, Flag, Heart, Share2, MoreHorizontal, ThumbsUp, ThumbsDown, Sparkles, Target, Calendar, Users, BarChart3, Award, MapPin, Zap } from 'lucide-react';
import { SiGoogle, SiFacebook, SiYelp, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
interface Review {
  id: string;
  customerName: string;
  customerInitials: string;
  rating: number;
  date: string;
  platform: 'google' | 'facebook' | 'yelp' | 'instagram' | 'linkedin' | 'x';
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
}

interface ReviewsPageProps {
  currentPersona: string;
}

const ReviewsPageEnhanced: React.FC<ReviewsPageProps> = ({ currentPersona }) => {
  // Simple demo mode detection without auth context
  const isDemoMode = localStorage.getItem('demoMode') === 'true';
  const actualBetaUser = !isDemoMode;
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'all' | 'positive' | 'negative' | 'neutral' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');

  useEffect(() => {
    // For beta users, show empty state; for demo users, generate persona-specific reviews
    if (actualBetaUser) {
      setReviews([]);
      return;
    }
    
    const generateReviews = () => {
      const baseReviews: Record<string, Review[]> = {
        kemar: [
          {
            id: 'rev-001',
            customerName: 'Jennifer Martinez',
            customerInitials: 'JM',
            rating: 5,
            date: '2025-01-10',
            platform: 'linkedin',
            content: 'Kemar\'s keynote at our leadership summit was absolutely transformational. His insights on executive presence and authentic leadership resonated deeply with our team. The practical frameworks he shared have already started making a difference in our organization.',
            response: 'Thank you Jennifer! It was an honor to speak at your summit. Your team\'s engagement and thoughtful questions made it a memorable experience. I\'m thrilled to hear the frameworks are already making an impact.',
            responseDate: '2025-01-11',
            sentiment: 'positive',
            category: 'Speaking Engagement',
            helpful: 23,
            persona: 'kemar',
            verified: true,
            location: 'Dallas, TX',
            reviewType: 'service'
          },
          {
            id: 'rev-002',
            customerName: 'Michael Chen',
            customerInitials: 'MC',
            rating: 5,
            date: '2025-01-08',
            platform: 'google',
            content: 'Outstanding executive coaching session! Kemar helped me navigate a challenging career transition with clarity and confidence. His strategic approach is unmatched, and the personalized action plan has been invaluable.',
            response: 'Michael, it\'s been a privilege working with you through this transition. Your dedication to growth and implementation of our strategies is commendable. Wishing you continued success in your new role!',
            responseDate: '2025-01-09',
            sentiment: 'positive',
            category: 'Executive Coaching',
            helpful: 18,
            persona: 'kemar',
            verified: true,
            location: 'San Francisco, CA',
            reviewType: 'service'
          },
          {
            id: 'rev-003',
            customerName: 'Sarah Johnson',
            customerInitials: 'SJ',
            rating: 4,
            date: '2025-01-06',
            platform: 'facebook',
            content: 'Great motivational content and valuable insights on leadership development. I appreciate the authentic approach and real-world examples. Would love to see more interactive workshops in the future.',
            sentiment: 'positive',
            category: 'Content & Training',
            helpful: 12,
            persona: 'kemar',
            verified: false,
            location: 'Austin, TX',
            reviewType: 'experience'
          },
          {
            id: 'rev-004',
            customerName: 'Robert Taylor',
            customerInitials: 'RT',
            rating: 5,
            date: '2025-01-04',
            platform: 'linkedin',
            content: 'Exceptional leadership consultant! Kemar\'s strategic guidance helped our executive team navigate complex organizational changes. His methodology is both practical and transformative.',
            response: 'Robert, thank you for the trust you placed in our partnership during such a critical time for your organization. It was inspiring to work with such a committed leadership team.',
            responseDate: '2025-01-05',
            sentiment: 'positive',
            category: 'Organizational Consulting',
            helpful: 31,
            persona: 'kemar',
            verified: true,
            location: 'New York, NY',
            reviewType: 'service'
          },
          {
            id: 'rev-005',
            customerName: 'Amanda Foster',
            customerInitials: 'AF',
            rating: 3,
            date: '2025-01-02',
            platform: 'google',
            content: 'The workshop content was good, but I felt it could have been more tailored to our specific industry challenges. Still valuable insights, just expected more customization for the premium price point.',
            sentiment: 'neutral',
            category: 'Workshop Training',
            helpful: 7,
            persona: 'kemar',
            verified: true,
            location: 'Chicago, IL',
            reviewType: 'experience'
          }
        ],
        karen: [
          {
            id: 'rev-006',
            customerName: 'David Rodriguez',
            customerInitials: 'DR',
            rating: 5,
            date: '2025-01-12',
            platform: 'google',
            content: 'Karen made our home buying process seamless! Her knowledge of the Miami Beach market is incredible. Found us the perfect oceanfront condo and negotiated an amazing deal. Couldn\'t be happier with our new home!',
            response: 'David, thank you so much! Welcome to your beautiful new home. I\'m thrilled we found the perfect oceanfront property for you and your family. Enjoy those sunrise views!',
            responseDate: '2025-01-13',
            sentiment: 'positive',
            category: 'Home Purchase',
            helpful: 19,
            persona: 'karen',
            verified: true,
            location: 'Miami Beach, FL',
            reviewType: 'service'
          },
          {
            id: 'rev-007',
            customerName: 'Lisa Thompson',
            customerInitials: 'LT',
            rating: 5,
            date: '2025-01-09',
            platform: 'yelp',
            content: 'Exceptional service from start to finish! Karen\'s market analysis was spot-on, and she negotiated a fantastic deal. Her attention to detail and responsiveness throughout the entire process was outstanding.',
            response: 'Lisa, it was such a pleasure working with you! Your trust in my expertise means everything. Congratulations on your beautiful new home, and thank you for choosing me as your realtor.',
            responseDate: '2025-01-10',
            sentiment: 'positive',
            category: 'Market Analysis & Negotiation',
            helpful: 15,
            persona: 'karen',
            verified: true,
            location: 'Miami, FL',
            reviewType: 'service'
          },
          {
            id: 'rev-008',
            customerName: 'Robert Wilson',
            customerInitials: 'RW',
            rating: 4,
            date: '2025-01-07',
            platform: 'facebook',
            content: 'Great experience overall. Karen was knowledgeable and professional. The only minor issue was some communication delays during the closing process, but everything worked out well in the end.',
            sentiment: 'positive',
            category: 'Home Closing',
            helpful: 8,
            persona: 'karen',
            verified: true,
            location: 'Coral Gables, FL',
            reviewType: 'experience'
          },
          {
            id: 'rev-009',
            customerName: 'Maria Gonzalez',
            customerInitials: 'MG',
            rating: 5,
            date: '2025-01-05',
            platform: 'google',
            content: 'Karen is simply the best realtor in Miami! Her expertise in luxury properties is unmatched. She found us our dream penthouse and handled every detail perfectly. Highly recommend to anyone looking for premium service.',
            response: 'Maria, working with you was such a joy! Your vision for the perfect penthouse was clear, and I\'m so happy we found exactly what you were looking for. Enjoy your stunning new home!',
            responseDate: '2025-01-06',
            sentiment: 'positive',
            category: 'Luxury Real Estate',
            helpful: 27,
            persona: 'karen',
            verified: true,
            location: 'Miami, FL',
            reviewType: 'service'
          },
          {
            id: 'rev-010',
            customerName: 'James Anderson',
            customerInitials: 'JA',
            rating: 2,
            date: '2025-01-03',
            platform: 'yelp',
            content: 'While Karen is knowledgeable, I felt like I wasn\'t getting enough attention as a first-time buyer. Some of my questions went unanswered for days, and I had to follow up multiple times on important matters.',
            sentiment: 'negative',
            category: 'First-Time Buyer Experience',
            helpful: 4,
            persona: 'karen',
            verified: true,
            location: 'Miami, FL',
            reviewType: 'experience'
          }
        ]
      };
      
      const personaReviews = baseReviews[currentPersona] || [];
      setReviews(personaReviews);
    };

    generateReviews();
  }, [currentPersona, actualBetaUser]);

  const getPlatformIcon = (platform: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (platform) {
      case 'google': return <SiGoogle {...iconProps} className="w-4 h-4 text-blue-600" />;
      case 'facebook': return <SiFacebook {...iconProps} className="w-4 h-4 text-blue-700" />;
      case 'yelp': return <SiYelp {...iconProps} className="w-4 h-4 text-red-600" />;
      case 'instagram': return <SiInstagram {...iconProps} className="w-4 h-4 text-pink-600" />;
      case 'linkedin': return <SiLinkedin {...iconProps} className="w-4 h-4 text-blue-800" />;
      case 'x': return <SiX {...iconProps} className="w-4 h-4 text-black" />;
      default: return <MessageSquare {...iconProps} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || review.platform === filterPlatform;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'overview') || 
                      (activeTab === 'analytics') ||
                      review.sentiment === activeTab;
    
    return matchesSearch && matchesPlatform && matchesTab;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'date':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const reviewStats = {
    total: reviews.length,
    positive: reviews.filter(r => r.sentiment === 'positive').length,
    negative: reviews.filter(r => r.sentiment === 'negative').length,
    neutral: reviews.filter(r => r.sentiment === 'neutral').length,
    averageRating: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
    responseRate: reviews.length > 0 ? (reviews.filter(r => r.response).length / reviews.length) * 100 : 0
  };

  const handleResponseSubmit = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, response: responseText, responseDate: new Date().toISOString().split('T')[0] }
        : review
    ));
    setShowResponseModal(false);
    setResponseText('');
    setSelectedReview(null);
  };

  if (actualBetaUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Reviews Center</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect your review platforms to start managing customer feedback and building your online reputation.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-black rounded-2xl hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Connect Review Platforms
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Reviews Center</h1>
              <p className="text-lg text-gray-600 font-medium">Manage customer feedback and online reputation</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-2 bg-gradient-to-r from-gray-50 via-white to-purple-50/30 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'all', label: 'All Reviews', icon: MessageSquare },
              { id: 'positive', label: 'Positive', icon: ThumbsUp },
              { id: 'negative', label: 'Negative', icon: ThumbsDown },
              { id: 'neutral', label: 'Neutral', icon: Clock },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-400 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-xl border border-purple-400/50 transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-100/50 hover:shadow-lg hover:scale-102'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-black tracking-tight">{tab.label}</span>
                {tab.id === 'positive' && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {reviewStats.positive}
                  </span>
                )}
                {tab.id === 'negative' && reviewStats.negative > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {reviewStats.negative}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border border-blue-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{reviewStats.total}</p>
                    <p className="text-sm text-gray-600 font-medium">Total Reviews</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/40 border border-yellow-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{reviewStats.averageRating.toFixed(1)}</p>
                    <p className="text-sm text-gray-600 font-medium">Average Rating</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 border border-green-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{reviewStats.responseRate.toFixed(0)}%</p>
                    <p className="text-sm text-gray-600 font-medium">Response Rate</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 border border-purple-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{reviewStats.positive}</p>
                    <p className="text-sm text-gray-600 font-medium">Positive Reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Reviews</h2>
                <p className="text-gray-600 font-medium">Latest customer feedback and responses</p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
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
                              {getPlatformIcon(review.platform)}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getSentimentColor(review.sentiment)}`}>
                          {review.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                      {review.response && (
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/50">
                          <p className="text-sm text-blue-900 font-medium mb-1">Your Response:</p>
                          <p className="text-blue-800">{review.response}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Reviews Tab */}
        {(activeTab === 'all' || activeTab === 'positive' || activeTab === 'negative' || activeTab === 'neutral') && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium"
                    />
                  </div>
                </div>
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                >
                  <option value="all">All Platforms</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="yelp">Yelp</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                >
                  <option value="date">Sort by Date</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="helpful">Sort by Helpful</option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden hover:shadow-3xl transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center text-white font-black text-lg shadow-xl">
                          {review.customerInitials}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <p className="text-lg font-black text-gray-900">{review.customerName}</p>
                            {review.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-600 font-medium">{review.date}</span>
                            {getPlatformIcon(review.platform)}
                            {review.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{review.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 text-sm font-bold rounded-2xl border ${getSentimentColor(review.sentiment)}`}>
                          {review.sentiment}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                          {review.category}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-800 leading-relaxed text-lg">{review.content}</p>
                    </div>

                    {review.response ? (
                      <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 rounded-2xl border border-blue-200/50 mb-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Reply className="w-4 h-4 text-blue-600" />
                          <p className="text-sm font-bold text-blue-900">Your Response • {review.responseDate}</p>
                        </div>
                        <p className="text-blue-800 leading-relaxed">{review.response}</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/50 mb-6">
                        <p className="text-gray-600 text-sm font-medium italic">No response yet</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">{review.helpful} helpful</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!review.response && (
                          <button
                            onClick={() => {
                              setSelectedReview(review);
                              setShowResponseModal(true);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Reply className="w-4 h-4 mr-2 inline" />
                            Respond
                          </button>
                        )}
                        <button className="p-3 text-gray-400 hover:text-gray-600 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-8">Review Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Platform Distribution */}
                <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 rounded-2xl border border-gray-200/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Distribution</h3>
                  <div className="space-y-4">
                    {Object.entries(reviews.reduce((acc, review) => {
                      acc[review.platform] = (acc[review.platform] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)).map(([platform, count]) => (
                      <div key={platform} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getPlatformIcon(platform)}
                          <span className="font-medium capitalize">{platform}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{ width: `${(count / reviews.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 rounded-2xl border border-gray-200/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Sentiment Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Positive</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500"
                            style={{ width: `${(reviewStats.positive / reviews.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{reviewStats.positive}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">Neutral</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500"
                            style={{ width: `${(reviewStats.neutral / reviews.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{reviewStats.neutral}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Negative</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500"
                            style={{ width: `${(reviewStats.negative / reviews.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{reviewStats.negative}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Response Modal */}
        {showResponseModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-gray-900">Respond to Review</h3>
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200/50 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold">
                      {selectedReview.customerInitials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedReview.customerName}</p>
                      <div className="flex">{renderStars(selectedReview.rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedReview.content}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Your Response</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write a thoughtful response..."
                    rows={6}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-medium"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleResponseSubmit(selectedReview.id)}
                    disabled={!responseText.trim()}
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Response
                  </button>
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPageEnhanced;