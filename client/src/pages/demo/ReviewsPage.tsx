import React, { useState } from 'react';
import { 
  MessageCircle, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Filter, 
  Search, 
  Calendar, 
  ExternalLink,
  Reply,
  Flag,
  Share2,
  Download,
  BarChart3,
  Users,
  Clock,
  Heart,
  MessageSquare,
  Zap
} from 'lucide-react';
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram, FaYelp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const ReviewsPage = () => {
  const [selectedReview, setSelectedReview] = useState('review-1');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 'review-1',
      author: 'Sarah Johnson',
      authorTitle: 'CEO, TechVision Inc.',
      platform: 'LinkedIn',
      rating: 5,
      date: '2025-01-15',
      content: 'Thomas delivered an absolutely transformational keynote for our leadership summit. His insights on authentic leadership resonated deeply with our 500+ executives. The standing ovation at the end said it all. His ability to connect complex leadership concepts to practical, actionable strategies was remarkable.',
      sentiment: 'positive',
      engagement: { likes: 47, comments: 12, shares: 23 },
      response: 'replied',
      verified: true,
      tags: ['keynote', 'leadership', 'executives', 'transformational'],
      eventType: 'Corporate Leadership Summit',
      audienceSize: '500+',
      location: 'San Francisco, CA'
    },
    {
      id: 'review-2',
      author: 'Michael Chen',
      authorTitle: 'Conference Director, Innovation Expo',
      platform: 'Google',
      rating: 5,
      date: '2025-01-12',
      content: 'Working with Thomas was a game-changer for our annual Innovation Expo. His presentation on "The Future of Leadership in Tech" was the highest-rated session of the entire conference. Attendees are still talking about his actionable frameworks weeks later. Professional, punctual, and incredibly engaging.',
      sentiment: 'positive',
      engagement: { likes: 89, comments: 34, shares: 56 },
      response: 'replied',
      verified: true,
      tags: ['innovation', 'tech leadership', 'frameworks', 'engaging'],
      eventType: 'Innovation Conference',
      audienceSize: '1,200+',
      location: 'Austin, TX'
    },
    {
      id: 'review-3',
      author: 'Dr. Amanda Rodriguez',
      authorTitle: 'Head of Learning & Development, MedTech Solutions',
      platform: 'Facebook',
      rating: 5,
      date: '2025-01-10',
      content: 'Thomas brought fresh perspectives to our Q4 leadership development program. His interactive approach and real-world case studies made complex leadership theories accessible to our diverse team. The post-session engagement metrics showed 95% satisfaction rate - our highest ever!',
      sentiment: 'positive',
      engagement: { likes: 156, comments: 28, shares: 43 },
      response: 'replied',
      verified: true,
      tags: ['leadership development', 'interactive', 'case studies', 'satisfaction'],
      eventType: 'Corporate Training Program',
      audienceSize: '150+',
      location: 'Virtual Event'
    },
    {
      id: 'review-4',
      author: 'James Patterson',
      authorTitle: 'Event Coordinator, Business Leaders Network',
      platform: 'Yelp',
      rating: 4,
      date: '2025-01-08',
      content: 'Thomas was great to work with and delivered solid content. The only minor feedback was that some attendees wanted more time for Q&A, but that speaks to how engaging his presentation was. Would definitely book again for future events.',
      sentiment: 'positive',
      engagement: { likes: 23, comments: 8, shares: 12 },
      response: 'replied',
      verified: true,
      tags: ['solid content', 'engaging', 'Q&A', 'future bookings'],
      eventType: 'Business Networking Event',
      audienceSize: '80+',
      location: 'Chicago, IL'
    },
    {
      id: 'review-5',
      author: 'Lisa Thompson',
      authorTitle: 'Marketing Director, StartupHub',
      platform: 'LinkedIn',
      rating: 5,
      date: '2025-01-05',
      content: 'Incredible session on authentic leadership for our startup founders. Thomas has this unique ability to make every person in the room feel like he\'s speaking directly to them. The actionable takeaways were immediately applicable to our day-to-day challenges.',
      sentiment: 'positive',
      engagement: { likes: 78, comments: 19, shares: 34 },
      response: 'replied',
      verified: true,
      tags: ['authentic leadership', 'startup founders', 'actionable', 'applicable'],
      eventType: 'Startup Founders Workshop',
      audienceSize: '45+',
      location: 'New York, NY'
    },
    {
      id: 'review-6',
      author: 'Robert Kim',
      authorTitle: 'HR Director, Global Enterprises',
      platform: 'Google',
      rating: 3,
      date: '2025-01-03',
      content: 'Thomas was professional and delivered as promised. Some content felt a bit generic for our specific industry needs, but overall a positive experience. The team appreciated his energy and passion for the subject matter.',
      sentiment: 'neutral',
      engagement: { likes: 12, comments: 5, shares: 3 },
      response: 'replied',
      verified: true,
      tags: ['professional', 'generic content', 'energy', 'passion'],
      eventType: 'Corporate Workshop',
      audienceSize: '200+',
      location: 'Los Angeles, CA'
    }
  ];

  const platformIcons = {
    LinkedIn: FaLinkedin,
    Google: FaGoogle,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    Yelp: FaYelp
  };

  const platformColors = {
    LinkedIn: 'text-blue-400',
    Google: 'text-red-400',
    Facebook: 'text-blue-400',
    Instagram: 'text-pink-400',
    Yelp: 'text-yellow-400'
  };

  const sentimentColors = {
    positive: 'text-green-400',
    neutral: 'text-yellow-400',
    negative: 'text-red-400'
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const responseRate = reviews.filter(r => r.response === 'replied').length / totalReviews * 100;

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesPlatform = filterPlatform === 'all' || review.platform === filterPlatform;
    const matchesSearch = review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRating && matchesPlatform && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'engagement':
        return (b.engagement.likes + b.engagement.comments + b.engagement.shares) - 
               (a.engagement.likes + a.engagement.comments + a.engagement.shares);
      default:
        return 0;
    }
  });

  const currentReview = reviews.find(r => r.id === selectedReview);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <MessageCircle className="w-8 h-8 mr-3 text-purple-400" />
            Reviews & Testimonials
          </h1>
          <p className="text-purple-300 mt-1">Monitor feedback and manage your online reputation</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Filter Controls */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-400 focus:outline-none"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-400 focus:outline-none"
          >
            <option value="all">All Platforms</option>
            <option value="google">Google</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="yelp">Yelp</option>
          </select>
          
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Respond to All
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Reply className="w-4 h-4 mr-2" />
            Quick Reply
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30">
            <Download className="w-4 h-4 mr-2" />
            Export Reviews
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-purple-300 text-sm">Average Rating</div>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</div>
          <div className="flex items-center">
            {renderStars(Math.round(averageRating))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-green-300 text-sm">Total Reviews</div>
            <MessageSquare className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalReviews}</div>
          <div className="text-green-400 text-sm">+3 this month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-blue-300 text-sm">Response Rate</div>
            <Reply className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{responseRate.toFixed(0)}%</div>
          <div className="text-blue-400 text-sm">Excellent response</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-yellow-300 text-sm">Positive Sentiment</div>
            <ThumbsUp className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">94%</div>
          <div className="text-yellow-400 text-sm">Above industry avg</div>
        </div>

        <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-red-300 text-sm">Avg Response Time</div>
            <Clock className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">4.2h</div>
          <div className="text-red-400 text-sm">Fast response</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative flex-1 min-w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="all">All Platforms</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Yelp">Yelp</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="engagement">Most Engagement</option>
              </select>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              {sortedReviews.map((review) => (
                <div
                  key={review.id}
                  onClick={() => setSelectedReview(review.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedReview === review.id
                      ? 'bg-purple-800/50 border-purple-500/50 shadow-lg'
                      : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {review.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{review.author}</span>
                          {review.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                        </div>
                        <div className="text-sm text-slate-400">{review.authorTitle}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <div className="flex items-center">
                        {React.createElement(platformIcons[review.platform], { 
                          className: `w-4 h-4 ${platformColors[review.platform]}` 
                        })}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-3 line-clamp-2">{review.content}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                      <span className="text-slate-400">{review.eventType}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {review.engagement.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {review.engagement.comments}
                      </span>
                      <span className="flex items-center">
                        <Share2 className="w-3 h-3 mr-1" />
                        {review.engagement.shares}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Details & Analytics */}
        <div className="lg:col-span-1 space-y-6">
          {/* Rating Distribution */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Rating Distribution
            </h3>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-white w-4">{item.rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Platform Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(
                reviews.reduce((acc, review) => {
                  acc[review.platform] = (acc[review.platform] || 0) + 1;
                  return acc;
                }, {})
              ).map(([platform, count]) => (
                <div key={platform} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center">
                      {React.createElement(platformIcons[platform], { 
                        className: `w-4 h-4 ${platformColors[platform]}` 
                      })}
                    </div>
                    <span className="text-white font-medium">{platform}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{count}</div>
                    <div className="text-xs text-slate-400">
                      {((count / totalReviews) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Sentiment Analysis
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm">Positive</span>
                  <span className="text-green-400 text-sm font-semibold">94%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 text-sm">Neutral</span>
                  <span className="text-yellow-400 text-sm font-semibold">4%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-2 rounded-full" style={{ width: '4%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-red-400 text-sm">Negative</span>
                  <span className="text-red-400 text-sm font-semibold">2%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full" style={{ width: '2%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* AI Response Generator */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              AI Response Generator
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <div className="text-sm text-purple-300 mb-2">Suggested Response for Sarah M.</div>
                <p className="text-sm text-white mb-3">
                  "Thank you for the wonderful feedback, Sarah! I'm thrilled the leadership strategies resonated with your team. Your implementation of the collaboration framework shows true commitment to growth."
                </p>
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                    Use Response
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30 text-xs">
                    Customize
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm">
                  Generate More Responses
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">New 5-star review</div>
                  <div className="text-xs text-slate-400">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Reply className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">Reply posted</div>
                  <div className="text-xs text-slate-400">5 hours ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">Review engagement spike</div>
                  <div className="text-xs text-slate-400">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;