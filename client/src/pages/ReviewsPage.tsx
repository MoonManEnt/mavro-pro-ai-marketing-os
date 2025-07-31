import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, MessageSquare, AlertCircle, CheckCircle, Clock, Filter, Search, Reply, Flag, Heart, Share2, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Review {
  id: string;
  customerName: string;
  customerInitials: string;
  rating: number;
  date: string;
  platform: 'google' | 'facebook' | 'yelp' | 'instagram' | 'linkedin';
  content: string;
  response?: string;
  responseDate?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
  helpful: number;
  persona: string;
  verified: boolean;
}

interface ReviewsPageProps {
  currentPersona: string;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ currentPersona }) => {
  const { isAuthenticated, isDemoMode } = useAuth();
  const actualBetaUser = isAuthenticated && !isDemoMode;
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');

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
            content: 'Kemar\'s keynote at our leadership summit was absolutely transformational. His insights on executive presence and authentic leadership resonated deeply with our team. Highly recommend!',
            response: 'Thank you Jennifer! It was an honor to speak at your summit. Your team\'s engagement and thoughtful questions made it a memorable experience.',
            responseDate: '2025-01-11',
            sentiment: 'positive',
            category: 'Speaking Engagement',
            helpful: 15,
            persona: 'kemar',
            verified: true
          },
          {
            id: 'rev-002',
            customerName: 'Michael Chen',
            customerInitials: 'MC',
            rating: 5,
            date: '2025-01-08',
            platform: 'google',
            content: 'Outstanding executive coaching session! Kemar helped me navigate a challenging career transition with clarity and confidence. His strategic approach is unmatched.',
            sentiment: 'positive',
            category: 'Executive Coaching',
            helpful: 8,
            persona: 'kemar',
            verified: true
          },
          {
            id: 'rev-003',
            customerName: 'Sarah Johnson',
            customerInitials: 'SJ',
            rating: 4,
            date: '2025-01-06',
            platform: 'facebook',
            content: 'Great motivational content, though I wish there was more practical application examples. Still valuable insights overall.',
            sentiment: 'positive',
            category: 'Content',
            helpful: 3,
            persona: 'kemar',
            verified: false
          }
        ],
        karen: [
          {
            id: 'rev-004',
            customerName: 'David Rodriguez',
            customerInitials: 'DR',
            rating: 5,
            date: '2025-01-12',
            platform: 'google',
            content: 'Karen made our home buying process seamless! Her knowledge of the Miami Beach market is incredible. Found us the perfect condo with ocean views.',
            response: 'Thank you David! Welcome to your new home. I\'m thrilled we found the perfect place for you and your family.',
            responseDate: '2025-01-13',
            sentiment: 'positive',
            category: 'Home Purchase',
            helpful: 12,
            persona: 'karen',
            verified: true
          },
          {
            id: 'rev-005',
            customerName: 'Lisa Thompson',
            customerInitials: 'LT',
            rating: 5,
            date: '2025-01-09',
            platform: 'yelp',
            content: 'Exceptional service from start to finish. Karen\'s market analysis was spot-on, and she negotiated a great deal. Highly professional and responsive.',
            sentiment: 'positive',
            category: 'Market Analysis',
            helpful: 9,
            persona: 'karen',
            verified: true
          },
          {
            id: 'rev-006',
            customerName: 'Robert Wilson',
            customerInitials: 'RW',
            rating: 3,
            date: '2025-01-05',
            platform: 'facebook',
            content: 'Good agent overall, but communication could be more frequent during the process. Results were satisfactory.',
            sentiment: 'neutral',
            category: 'Communication',
            helpful: 2,
            persona: 'karen',
            verified: false
          }
        ],
        sarah: [
          {
            id: 'rev-007',
            customerName: 'Amanda Foster',
            customerInitials: 'AF',
            rating: 5,
            date: '2025-01-11',
            platform: 'google',
            content: 'Amazing results with my Botox treatment! Sarah is so knowledgeable and made me feel comfortable throughout. The clinic is beautiful and professional.',
            response: 'Thank you Amanda! You look absolutely radiant. I\'m so happy with your results. See you for your follow-up!',
            responseDate: '2025-01-12',
            sentiment: 'positive',
            category: 'Botox Treatment',
            helpful: 18,
            persona: 'sarah',
            verified: true
          },
          {
            id: 'rev-008',
            customerName: 'Maria Gonzalez',
            customerInitials: 'MG',
            rating: 5,
            date: '2025-01-07',
            platform: 'yelp',
            content: 'The lip filler results exceeded my expectations! Sarah has an artistic eye and really listened to what I wanted. Highly recommend this medspa.',
            sentiment: 'positive',
            category: 'Lip Fillers',
            helpful: 14,
            persona: 'sarah',
            verified: true
          },
          {
            id: 'rev-009',
            customerName: 'Jessica Park',
            customerInitials: 'JP',
            rating: 2,
            date: '2025-01-04',
            platform: 'google',
            content: 'Treatment was okay but had to wait 45 minutes past my appointment time. Staff seemed rushed and not very friendly.',
            sentiment: 'negative',
            category: 'Service Experience',
            helpful: 1,
            persona: 'sarah',
            verified: false
          }
        ],
        marco: [
          {
            id: 'rev-010',
            customerName: 'Anthony DiMarco',
            customerInitials: 'AD',
            rating: 5,
            date: '2025-01-10',
            platform: 'yelp',
            content: 'Authentic Italian cuisine at its finest! Marco\'s pasta dishes are incredible - you can taste the quality in every bite. The atmosphere is perfect for date night.',
            response: 'Grazie mille Anthony! It brings me joy to share authentic Italian flavors with you. Come back soon!',
            responseDate: '2025-01-11',
            sentiment: 'positive',
            category: 'Food Quality',
            helpful: 22,
            persona: 'marco',
            verified: true
          },
          {
            id: 'rev-011',
            customerName: 'Emily Watson',
            customerInitials: 'EW',
            rating: 5,
            date: '2025-01-08',
            platform: 'google',
            content: 'The weekend brunch was outstanding! Fresh ingredients, beautiful presentation, and the tiramisu was to die for. Marco personally came to check on our table.',
            sentiment: 'positive',
            category: 'Brunch Experience',
            helpful: 16,
            persona: 'marco',
            verified: true
          },
          {
            id: 'rev-012',
            customerName: 'Tom Anderson',
            customerInitials: 'TA',
            rating: 3,
            date: '2025-01-06',
            platform: 'facebook',
            content: 'Food was good but service was slow. Waited 20 minutes for drinks and another 30 for appetizers. Hope they can improve the pace.',
            sentiment: 'neutral',
            category: 'Service Speed',
            helpful: 4,
            persona: 'marco',
            verified: false
          }
        ],
        alex: [
          {
            id: 'rev-013',
            customerName: 'Rachel Kim',
            customerInitials: 'RK',
            rating: 5,
            date: '2025-01-09',
            platform: 'google',
            content: 'Alex transformed my fitness journey! His personalized approach and nutritional guidance helped me lose 30 pounds and gain confidence. Best trainer ever!',
            response: 'Rachel, you put in the work and achieved incredible results! I\'m so proud of your dedication and transformation.',
            responseDate: '2025-01-10',
            sentiment: 'positive',
            category: 'Personal Training',
            helpful: 20,
            persona: 'alex',
            verified: true
          },
          {
            id: 'rev-014',
            customerName: 'James Miller',
            customerInitials: 'JM',
            rating: 5,
            date: '2025-01-07',
            platform: 'yelp',
            content: 'Great gym with excellent equipment and knowledgeable staff. Alex\'s group fitness classes are challenging but fun. Highly recommend!',
            sentiment: 'positive',
            category: 'Gym Facilities',
            helpful: 11,
            persona: 'alex',
            verified: true
          },
          {
            id: 'rev-015',
            customerName: 'Karen Davis',
            customerInitials: 'KD',
            rating: 4,
            date: '2025-01-05',
            platform: 'facebook',
            content: 'Good training programs but the gym can get crowded during peak hours. Alex is helpful when available.',
            sentiment: 'positive',
            category: 'Gym Experience',
            helpful: 5,
            persona: 'alex',
            verified: false
          }
        ],
        david: [
          {
            id: 'rev-016',
            customerName: 'Steven Parker',
            customerInitials: 'SP',
            rating: 5,
            date: '2025-01-11',
            platform: 'google',
            content: 'Excellent car buying experience! David was transparent about pricing and helped me find the perfect vehicle within my budget. No pressure tactics.',
            response: 'Thank you Steven! Enjoy your new car and don\'t hesitate to reach out if you need anything.',
            responseDate: '2025-01-12',
            sentiment: 'positive',
            category: 'Car Purchase',
            helpful: 15,
            persona: 'david',
            verified: true
          },
          {
            id: 'rev-017',
            customerName: 'Jennifer Lee',
            customerInitials: 'JL',
            rating: 5,
            date: '2025-01-08',
            platform: 'yelp',
            content: 'Outstanding service department! Quick, efficient, and fair pricing. David\'s team kept me informed throughout the repair process.',
            sentiment: 'positive',
            category: 'Service Department',
            helpful: 12,
            persona: 'david',
            verified: true
          },
          {
            id: 'rev-018',
            customerName: 'Mike Johnson',
            customerInitials: 'MJ',
            rating: 2,
            date: '2025-01-04',
            platform: 'google',
            content: 'Had issues with financing process taking too long. Communication about delays could have been better.',
            sentiment: 'negative',
            category: 'Financing Process',
            helpful: 3,
            persona: 'david',
            verified: false
          }
        ]
      };

      return baseReviews[currentPersona] || [];
    };

    setReviews(generateReviews());
  }, [currentPersona]);

  const filteredReviews = reviews.filter(review => {
    const matchesTab = activeTab === 'all' || review.sentiment === activeTab;
    const matchesSearch = review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'bg-red-100 text-red-800';
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'yelp': return 'bg-yellow-100 text-yellow-800';
      case 'instagram': return 'bg-purple-100 text-purple-800';
      case 'linkedin': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-yellow-600';
      default: return 'text-gray-600';
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

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const totalReviews = reviews.length;
  const positiveReviews = reviews.filter(r => r.sentiment === 'positive').length;
  const responseRate = reviews.filter(r => r.response).length / totalReviews * 100;

  const handleResponseSubmit = () => {
    if (selectedReview && responseText.trim()) {
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, response: responseText, responseDate: new Date().toISOString().split('T')[0] }
          : review
      ));
      setResponseText('');
      setShowResponseModal(false);
      setSelectedReview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
            <p className="text-gray-600 mt-2">Monitor and respond to customer reviews across all platforms</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Generate Response
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Export Reviews
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-gray-900">{actualBetaUser ? '0.0' : averageRating.toFixed(1)}</p>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{actualBetaUser ? '0' : totalReviews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Positive Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{actualBetaUser ? '0' : positiveReviews}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">{actualBetaUser ? 'NaN%' : `${responseRate.toFixed(0)}%`}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Filters Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'positive', label: 'Positive' },
                  { key: 'negative', label: 'Negative' },
                  { key: 'neutral', label: 'Neutral' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Content */}
          <div className="p-6">
            {actualBetaUser ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                <p className="text-gray-500">Reviews from your customers will appear here once you start receiving feedback.</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium">{review.customerInitials}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">{review.customerName}</h3>
                    {review.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(review.platform)}`}>
                      {review.platform}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{review.category}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  {review.response && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Reply className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">Your Response</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{review.responseDate}</span>
                      </div>
                      <p className="text-gray-700">{review.response}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${getSentimentColor(review.sentiment)}`}>
                  {review.sentiment}
                </span>
                <button 
                  onClick={() => {
                    setSelectedReview(review);
                    setShowResponseModal(true);
                  }}
                  className="text-gray-400 hover:text-purple-600"
                >
                  <Reply className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">Report</span>
                </button>
              </div>
              {!review.response && (
                <button 
                  onClick={() => {
                    setSelectedReview(review);
                    setShowResponseModal(true);
                  }}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Respond
                </button>
              )}
            </div>
          </div>
        ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Respond to Review</h3>
                <button 
                  onClick={() => setShowResponseModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{selectedReview.customerName}</h4>
                  <div className="flex">{renderStars(selectedReview.rating)}</div>
                </div>
                <p className="text-gray-700">{selectedReview.content}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Response
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write a professional response..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowResponseModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleResponseSubmit}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;