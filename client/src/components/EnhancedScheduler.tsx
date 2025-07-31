import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addDays, addWeeks, subWeeks, addMonths, subMonths, startOfMonth, endOfMonth, isSameDay, isSameMonth, parseISO, getMonth, getDate } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Clock, Play, Image, FileText, Mail, Video, Users, Eye, Filter, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';

// Platform color definitions based on user specifications
const PLATFORM_COLORS = {
  instagram: { 
    color: '#8B5CF6', 
    gradient: 'from-purple-500 to-pink-500',
    name: 'Instagram',
    emoji: '🟣'
  },
  tiktok: { 
    color: '#00F5FF', 
    gradient: 'from-cyan-400 to-cyan-600',
    name: 'TikTok',
    emoji: '🔵'
  },
  facebook: { 
    color: '#1877F2', 
    gradient: 'from-blue-500 to-blue-600',
    name: 'Facebook',
    emoji: '🔵'
  },
  x: { 
    color: '#000000', 
    gradient: 'from-gray-800 to-black',
    name: 'X (Twitter)',
    emoji: '⚫'
  },
  youtube: { 
    color: '#FF0000', 
    gradient: 'from-red-500 to-red-600',
    name: 'YouTube',
    emoji: '🔴'
  },
  googlebiz: { 
    color: 'rainbow', 
    gradient: 'from-blue-500 via-red-500 via-yellow-500 to-green-500',
    name: 'Google Biz',
    emoji: '🌈'
  },
  linkedin: { 
    color: '#0A66C2', 
    gradient: 'from-blue-600 to-blue-800',
    name: 'LinkedIn',
    emoji: '🔷'
  },
  email: { 
    color: '#FF6B35', 
    gradient: 'from-orange-500 to-yellow-500',
    name: 'Email',
    emoji: '🟠'
  }
};

// Holiday data for 2025
const HOLIDAYS_2025 = {
  '2025-01-01': { name: 'New Year\'s Day', type: 'federal', emoji: '🎉' },
  '2025-01-20': { name: 'Martin Luther King Jr. Day', type: 'federal', emoji: '✊' },
  '2025-02-14': { name: 'Valentine\'s Day', type: 'national', emoji: '❤️' },
  '2025-02-17': { name: 'Presidents\' Day', type: 'federal', emoji: '🇺🇸' },
  '2025-03-17': { name: 'St. Patrick\'s Day', type: 'national', emoji: '🍀' },
  '2025-04-22': { name: 'Earth Day', type: 'national', emoji: '🌍' },
  '2025-05-05': { name: 'Cinco de Mayo', type: 'national', emoji: '🌮' },
  '2025-05-11': { name: 'Mother\'s Day', type: 'national', emoji: '👩' },
  '2025-05-26': { name: 'Memorial Day', type: 'federal', emoji: '🇺🇸' },
  '2025-06-15': { name: 'Father\'s Day', type: 'national', emoji: '👨' },
  '2025-07-04': { name: 'Independence Day', type: 'federal', emoji: '🎆' },
  '2025-07-24': { name: 'National Tequila Day', type: 'fun', emoji: '🍹' },
  '2025-07-23': { name: 'National Hot Dog Day', type: 'fun', emoji: '🌭' },
  '2025-08-10': { name: 'National S\'mores Day', type: 'fun', emoji: '🔥' },
  '2025-09-01': { name: 'Labor Day', type: 'federal', emoji: '⚒️' },
  '2025-09-19': { name: 'National Talk Like a Pirate Day', type: 'fun', emoji: '🏴‍☠️' },
  '2025-10-13': { name: 'Columbus Day', type: 'federal', emoji: '🗺️' },
  '2025-10-31': { name: 'Halloween', type: 'national', emoji: '🎃' },
  '2025-11-11': { name: 'Veterans Day', type: 'federal', emoji: '🎖️' },
  '2025-11-27': { name: 'Thanksgiving', type: 'federal', emoji: '🦃' },
  '2025-12-25': { name: 'Christmas Day', type: 'federal', emoji: '🎄' },
  '2025-12-31': { name: 'New Year\'s Eve', type: 'national', emoji: '🎊' }
};

interface ScheduledPost {
  id: string;
  title: string;
  platform: keyof typeof PLATFORM_COLORS;
  datetime: string;
  type: 'post' | 'story' | 'reel' | 'video' | 'email' | 'blog';
  status: 'scheduled' | 'published' | 'draft';
  caption?: string;
  hashtags?: string[];
  boostLevel?: number;
  thumbnail?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

// Enhanced sample data with multiple platforms and holiday integration
const SAMPLE_POSTS: ScheduledPost[] = [
  // Today's content (July 25, 2025)
  {
    id: '1',
    title: 'Morning Motivation',
    platform: 'instagram',
    datetime: '2025-07-25T08:00:00',
    type: 'post',
    status: 'published',
    caption: 'Start your day with positive energy! ✨',
    hashtags: ['#MorningMotivation', '#Positivity', '#Energy'],
    engagement: { likes: 342, comments: 28, shares: 15 },
    boostLevel: 2
  },
  {
    id: '2',
    title: 'Quick Tips Video',
    platform: 'tiktok',
    datetime: '2025-07-25T12:30:00',
    type: 'video',
    status: 'scheduled',
    caption: '3 productivity hacks you need to try!',
    hashtags: ['#ProductivityHacks', '#Tips', '#LifeHacks', '#fyp']
  },
  {
    id: '3',
    title: 'Team Lunch Photo',
    platform: 'linkedin',
    datetime: '2025-07-25T13:15:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Great team collaboration over lunch today!',
    hashtags: ['#TeamWork', '#Culture', '#Collaboration']
  },
  {
    id: '4',
    title: 'Weekend Plans Poll',
    platform: 'facebook',
    datetime: '2025-07-25T17:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'What are your weekend plans? Tell us in the comments!',
    hashtags: ['#WeekendVibes', '#Community']
  },

  // Weekend content (July 26-27, 2025)
  {
    id: '5',
    title: 'Saturday Special Offer',
    platform: 'instagram',
    datetime: '2025-07-26T09:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Weekend special! 30% off select items 🛍️',
    hashtags: ['#WeekendSpecial', '#Sale', '#Shopping'],
    boostLevel: 3
  },
  {
    id: '6',
    title: 'Behind the Scenes',
    platform: 'youtube',
    datetime: '2025-07-26T11:00:00',
    type: 'video',
    status: 'scheduled',
    caption: 'Take a look behind the scenes of our latest project'
  },
  {
    id: '7',
    title: 'Customer Spotlight',
    platform: 'linkedin',
    datetime: '2025-07-26T15:30:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Featuring amazing success stories from our clients',
    hashtags: ['#CustomerSpotlight', '#Success', '#Testimonials']
  },
  {
    id: '8',
    title: 'Sunday Inspiration',
    platform: 'instagram',
    datetime: '2025-07-27T10:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Sunday inspiration to fuel your week ahead 🌟',
    hashtags: ['#SundayInspiration', '#Motivation', '#WeekAhead']
  },
  {
    id: '9',
    title: 'Email Newsletter',
    platform: 'email',
    datetime: '2025-07-27T09:00:00',
    type: 'email',
    status: 'scheduled',
    caption: 'Weekly digest: Top insights and upcoming events'
  },

  // Next week content (July 28-31, 2025)
  {
    id: '10',
    title: 'Monday Momentum',
    platform: 'tiktok',
    datetime: '2025-07-28T08:30:00',
    type: 'video',
    status: 'scheduled',
    caption: 'Monday motivation to crush your goals! 💪',
    hashtags: ['#MondayMotivation', '#Goals', '#Hustle', '#fyp']
  },
  {
    id: '11',
    title: 'Product Announcement',
    platform: 'x',
    datetime: '2025-07-28T14:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Exciting product update coming this week! Stay tuned 🚀'
  },
  {
    id: '12',
    title: 'Google Business Update',
    platform: 'googlebiz',
    datetime: '2025-07-28T16:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Updated business hours and new services available'
  },
  {
    id: '13',
    title: 'Tuesday Tips',
    platform: 'instagram',
    datetime: '2025-07-29T11:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Tuesday tips for better productivity 📊',
    hashtags: ['#TuesdayTips', '#Productivity', '#WorkSmart'],
    boostLevel: 1
  },
  {
    id: '14',
    title: 'Industry Insights',
    platform: 'linkedin',
    datetime: '2025-07-29T16:30:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Latest industry trends and insights you should know',
    hashtags: ['#IndustryInsights', '#Trends', '#Knowledge']
  },
  {
    id: '15',
    title: 'Mid-week Check-in',
    platform: 'facebook',
    datetime: '2025-07-30T12:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'How is your week going? Share your progress!'
  },
  {
    id: '16',
    title: 'Thursday Thoughts',
    platform: 'x',
    datetime: '2025-07-31T15:00:00',
    type: 'post',
    status: 'scheduled',
    caption: 'Thursday thoughts on work-life balance 🤔'
  },

  // National Tequila Day themed content (July 24, 2025)
  {
    id: '17',
    title: 'Tequila Day Special',
    platform: 'instagram',
    datetime: '2025-07-24T17:00:00',
    type: 'post',
    status: 'published',
    caption: 'Celebrating National Tequila Day! 🍹 Cheers to great flavors!',
    hashtags: ['#NationalTequilaDay', '#Cheers', '#Celebration'],
    engagement: { likes: 189, comments: 34, shares: 8 },
    boostLevel: 2
  },
  {
    id: '18',
    title: 'Happy Hour Announcement',
    platform: 'facebook',
    datetime: '2025-07-24T16:30:00',
    type: 'post',
    status: 'published',
    caption: 'Join us for Tequila Day happy hour specials!',
    engagement: { likes: 156, comments: 22, shares: 12 }
  }
];

interface EnhancedSchedulerProps {
  posts?: ScheduledPost[];
}

const EnhancedScheduler: React.FC<EnhancedSchedulerProps> = ({ posts = SAMPLE_POSTS }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year' | 'schedule' | '4days'>('week');
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(Object.keys(PLATFORM_COLORS));
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get holiday for a specific date
  const getHolidayForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return (HOLIDAYS_2025 as Record<string, any>)[dateKey];
  };

  // Count posts by platform for a given date range
  const getPlatformCounts = (startDate: Date, endDate: Date) => {
    const counts: Record<string, number> = {};
    selectedPlatforms.forEach(platform => {
      counts[platform] = posts.filter(post => {
        const postDate = parseISO(post.datetime);
        return postDate >= startDate && postDate <= endDate && post.platform === platform;
      }).length;
    });
    return counts;
  };

  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // Toggle day expansion
  const toggleDayExpansion = (dateKey: string) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dateKey)) {
        newSet.delete(dateKey);
      } else {
        newSet.add(dateKey);
      }
      return newSet;
    });
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getDayView = () => [currentDate];
  
  const getFourDays = () => {
    return Array.from({ length: 4 }, (_, i) => addDays(currentDate, i));
  };
  
  const getFiveDays = () => {
    return Array.from({ length: 5 }, (_, i) => addDays(currentDate, i));
  };

  const getYearMonths = () => {
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    return Array.from({ length: 12 }, (_, i) => addMonths(startOfYear, i));
  };

  const getMonthDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = [];
    
    // Add days from previous month to fill the week
    const startWeek = startOfWeek(start, { weekStartsOn: 0 });
    for (let day = startWeek; day < start; day = addDays(day, 1)) {
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Add days of current month
    for (let day = start; day <= end; day = addDays(day, 1)) {
      days.push({ date: day, isCurrentMonth: true });
    }
    
    // Add days from next month to complete the grid
    while (days.length < 42) {
      days.push({ 
        date: addDays(days[days.length - 1].date, 1), 
        isCurrentMonth: false 
      });
    }
    
    return days;
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => 
      isSameDay(parseISO(post.datetime), date)
    );
  };

  const getPostsForTimeSlot = (date: Date, hour: number) => {
    return posts.filter(post => {
      const postDate = parseISO(post.datetime);
      return isSameDay(postDate, date) && postDate.getHours() === hour;
    });
  };

  const PostCard: React.FC<{ post: ScheduledPost; isSmall?: boolean }> = ({ 
    post, 
    isSmall = false 
  }) => {
    const platform = PLATFORM_COLORS[post.platform];
    const isPublished = post.status === 'published';
    const isHovered = hoveredPost === post.id;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`
                relative rounded-lg cursor-pointer transition-all duration-300 mb-1 group overflow-hidden
                ${isSmall ? 'text-xs min-h-[32px] p-2' : 'text-sm min-h-[40px] p-3'}
                ${isPublished ? 'opacity-75' : ''}
                hover:shadow-xl hover:scale-[1.02] transform hover:z-10
              `}
              style={{
                backgroundColor: platform.color === 'rainbow' ? '#8B5CF6' : platform.color,
                color: 'white'
              }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => setSelectedPost(post)}
            >
              {/* Background overlay for better readability */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold ${isSmall ? 'text-xs' : 'text-sm'} text-white truncate leading-tight`}>
                      {post.title}
                    </h4>
                    {!isSmall && (
                      <div className="flex items-center text-xs text-white/90 mt-1">
                        <span className="mr-1">{platform.emoji}</span>
                        <span className="truncate">{platform.name}</span>
                        <span className="mx-1">•</span>
                        <span>{format(parseISO(post.datetime), 'HH:mm')}</span>
                      </div>
                    )}
                    {isSmall && (
                      <div className="text-xs text-white/80">
                        {format(parseISO(post.datetime), 'HH:mm')}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                    {post.boostLevel && (
                      <div className="px-2 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                        {post.boostLevel}x
                      </div>
                    )}
                    {isPublished && (
                      <div className="w-2 h-2 bg-green-300 rounded-full shadow-sm"></div>
                    )}
                  </div>
                </div>
                
                {!isSmall && post.caption && (
                  <p className="text-xs text-white/90 line-clamp-1 leading-relaxed mt-1 font-medium">
                    {post.caption}
                  </p>
                )}
              </div>

              {/* Hover effect overlay */}
              {isHovered && (
                <div className="absolute inset-0 bg-white/10 pointer-events-none transition-opacity duration-300"></div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm">
            <div className="p-4 bg-white border border-gray-200 shadow-xl rounded-xl">
              <div className="flex items-start space-x-3 mb-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: platform.color === 'rainbow' ? '#8B5CF6' : platform.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">{post.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {platform.name} • {format(parseISO(post.datetime), 'MMM dd, yyyy • HH:mm')}
                  </p>
                </div>
              </div>
              
              {post.caption && (
                <div className="mb-3">
                  <p className="text-sm text-gray-700 leading-relaxed">{post.caption}</p>
                </div>
              )}
              
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.slice(0, 5).map(tag => (
                      <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                    {post.hashtags.length > 5 && (
                      <span className="text-xs text-gray-500">+{post.hashtags.length - 5} more</span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className={`text-xs font-semibold capitalize px-2 py-1 rounded-full ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : post.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status}
                  </span>
                  {post.boostLevel && (
                    <span className="text-xs text-purple-600 font-bold">
                      Boost Level: {post.boostLevel}x
                    </span>
                  )}
                </div>
                {post.engagement && (
                  <div className="text-xs text-gray-500">
                    {post.engagement.likes + post.engagement.comments + post.engagement.shares} interactions
                  </div>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // PostTooltip Component for detailed post information
  const PostTooltip: React.FC<{ post: ScheduledPost }> = ({ post }) => {
    const platform = PLATFORM_COLORS[post.platform];
    
    return (
      <div className="p-4 bg-white border border-gray-200 shadow-xl rounded-xl">
        <div className="flex items-start space-x-3 mb-3">
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: platform.color === 'rainbow' ? '#8B5CF6' : platform.color }}
          ></div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm">{post.title}</h3>
            <p className="text-xs text-gray-600 mt-1">
              {platform.name} • {format(parseISO(post.datetime), 'MMM dd, yyyy • HH:mm')}
            </p>
          </div>
        </div>
        
        {post.caption && (
          <div className="mb-3">
            <p className="text-sm text-gray-700 leading-relaxed">{post.caption}</p>
          </div>
        )}
        
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {post.hashtags.slice(0, 5).map(tag => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                  {tag}
                </span>
              ))}
              {post.hashtags.length > 5 && (
                <span className="text-xs text-gray-500">+{post.hashtags.length - 5} more</span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span className={`text-xs font-semibold capitalize px-2 py-1 rounded-full ${
              post.status === 'published' 
                ? 'bg-green-100 text-green-700' 
                : post.status === 'scheduled'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {post.status}
            </span>
            {post.boostLevel && (
              <span className="text-xs text-purple-600 font-bold">
                Boost Level: {post.boostLevel}x
              </span>
            )}
          </div>
          {post.engagement && (
            <div className="text-xs text-gray-500">
              {post.engagement.likes + post.engagement.comments + post.engagement.shares} interactions
            </div>
          )}
        </div>
      </div>
    );
  };

  const WeekView = () => {
    const weekDays = getWeekDays();
    
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header with days */}
        <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50/50">
          <div className="p-4 text-sm font-semibold text-gray-600 bg-white border-r border-gray-200">
            <div className="text-xs text-gray-400 mb-1">GMT-05</div>
            <div>Time</div>
          </div>
          {weekDays.map(day => {
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toString()} className={`p-4 text-center border-l border-gray-200 ${isToday ? 'bg-blue-50' : ''}`}>
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                  {format(day, 'EEE').toUpperCase()}
                </div>
                <div className={`text-2xl font-bold mt-1 ${
                  isToday 
                    ? 'text-blue-600 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' 
                    : 'text-gray-800'
                }`}>
                  {format(day, 'dd')}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Time grid */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <div className="grid grid-cols-8">
            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={time}>
                <div className="p-3 text-xs text-gray-500 border-b border-gray-100 bg-white border-r border-gray-200 sticky left-0 z-10">
                  <div className="font-medium">{time}</div>
                </div>
                {weekDays.map((day, dayIndex) => {
                  const hour = parseInt(time.split(':')[0]);
                  const postsInSlot = getPostsForTimeSlot(day, hour);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div 
                      key={`${day.toString()}-${time}`}
                      className={`
                        min-h-[60px] p-2 border-l border-b border-gray-100 transition-colors relative
                        ${isToday ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}
                        ${timeIndex % 2 === 0 ? 'bg-gray-50/20' : ''}
                      `}
                    >
                      <div className="space-y-1 relative z-10">
                        {postsInSlot
                          .filter(post => selectedPlatforms.includes(post.platform))
                          .map(post => (
                            <PostCard key={post.id} post={post} />
                          ))}
                      </div>
                      
                      {/* Current time indicator for today */}
                      {isToday && new Date().getHours() === hour && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 z-20">
                          <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    const days = [];
    let day = calendarStart;
    
    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((dayName) => (
            <div key={dayName} className="p-3 text-center text-xs font-medium text-gray-600">
              {dayName}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-6 min-h-0">
          {days.map((day, index) => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const dayPosts = getPostsForDate(day).filter(post => selectedPlatforms.includes(post.platform));
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);
            const holiday = getHolidayForDate(day);
            
            return (
              <div
                key={index}
                className={`border-r border-b border-gray-200 p-2 relative overflow-hidden min-h-[140px] ${
                  !isCurrentMonth ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-gray-50 transition-colors`}
              >
                {/* Date Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-sm font-medium ${
                    isToday 
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                      : isCurrentMonth 
                        ? 'text-gray-900' 
                        : 'text-gray-400'
                  }`}>
                    {format(day, 'd')}
                  </div>
                </div>
                
                {/* Holiday Indicator */}
                {holiday && (
                  <div className={`text-xs px-2 py-1 rounded mb-1 ${
                    holiday.type === 'federal' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {holiday.name}
                  </div>
                )}
                
                {/* Events */}
                <div className="space-y-1">
                  {dayPosts.map((post, postIndex) => {
                    const config = PLATFORM_COLORS[post.platform];
                    const time = format(parseISO(post.datetime), 'h:mm a').toLowerCase();
                    
                    return (
                      <TooltipProvider key={post.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex items-center space-x-2 cursor-pointer group"
                              onMouseEnter={() => setHoveredPost(post.id)}
                              onMouseLeave={() => setHoveredPost(null)}
                            >
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ 
                                  backgroundColor: config?.color === 'rainbow' ? '#8B5CF6' : config?.color || '#6B7280'
                                }}
                              />
                              <div className="text-xs text-gray-700 truncate group-hover:text-gray-900 transition-colors">
                                <span className="text-gray-500">{time}</span> {post.title}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <PostTooltip post={post} />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Day View Component
  const DayView = () => {
    const dayData = getDayView();
    
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50/50">
          <div className="p-4 text-sm font-semibold text-gray-600 bg-white border-r border-gray-200">
            <div className="text-xs text-gray-400 mb-1">GMT-05</div>
            <div>Time</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-sm font-medium text-gray-600">
              {format(currentDate, 'EEEE').toUpperCase()}
            </div>
            <div className="text-2xl font-bold mt-1 text-blue-600">
              {format(currentDate, 'dd')}
            </div>
          </div>
        </div>
        
        {/* Time grid */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <div className="grid grid-cols-2">
            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={time}>
                <div className="p-3 text-xs text-gray-500 border-b border-gray-100 bg-white border-r border-gray-200 sticky left-0 z-10">
                  <div className="font-medium">{time}</div>
                </div>
                <div className="min-h-[60px] p-2 border-b border-gray-100 hover:bg-gray-50/50 transition-colors relative">
                  <div className="space-y-1">
                    {getPostsForTimeSlot(currentDate, parseInt(time.split(':')[0]))
                      .filter(post => selectedPlatforms.includes(post.platform))
                      .map(post => (
                        <PostCard key={post.id} post={post} />
                      ))}
                  </div>
                  
                  {/* Current time indicator */}
                  {isSameDay(currentDate, new Date()) && new Date().getHours() === parseInt(time.split(':')[0]) && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 z-20">
                      <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Multi-Day View Component (4-day and 5-day)
  const MultiDayView = ({ days }: { days: Date[] }) => {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header with days */}
        <div className={`grid grid-cols-${days.length + 1} border-b border-gray-200 bg-gray-50/50`}>
          <div className="p-4 text-sm font-semibold text-gray-600 bg-white border-r border-gray-200">
            <div className="text-xs text-gray-400 mb-1">GMT-05</div>
            <div>Time</div>
          </div>
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toString()} className={`p-4 text-center border-l border-gray-200 ${isToday ? 'bg-blue-50' : ''}`}>
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                  {format(day, 'EEE').toUpperCase()}
                </div>
                <div className={`text-2xl font-bold mt-1 ${
                  isToday 
                    ? 'text-blue-600 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' 
                    : 'text-gray-800'
                }`}>
                  {format(day, 'dd')}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Time grid */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <div className={`grid grid-cols-${days.length + 1}`}>
            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={time}>
                <div className="p-3 text-xs text-gray-500 border-b border-gray-100 bg-white border-r border-gray-200 sticky left-0 z-10">
                  <div className="font-medium">{time}</div>
                </div>
                {days.map((day, dayIndex) => {
                  const hour = parseInt(time.split(':')[0]);
                  const postsInSlot = getPostsForTimeSlot(day, hour);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div 
                      key={`${day.toString()}-${time}`}
                      className={`
                        min-h-[60px] p-2 border-l border-b border-gray-100 transition-colors relative
                        ${isToday ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}
                        ${timeIndex % 2 === 0 ? 'bg-gray-50/20' : ''}
                      `}
                    >
                      <div className="space-y-1 relative z-10">
                        {postsInSlot
                          .filter(post => selectedPlatforms.includes(post.platform))
                          .map(post => (
                            <PostCard key={post.id} post={post} />
                          ))}
                      </div>
                      
                      {/* Current time indicator for today */}
                      {isToday && new Date().getHours() === hour && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 z-20">
                          <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Year View Component
  const YearView = () => {
    const months = getYearMonths();
    
    return (
      <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
        <div className="grid grid-cols-3 gap-6">
          {months.map(month => {
            const monthStart = startOfMonth(month);
            const monthEnd = endOfMonth(month);
            const monthPosts = posts.filter(post => {
              const postDate = parseISO(post.datetime);
              return postDate >= monthStart && postDate <= monthEnd && selectedPlatforms.includes(post.platform);
            });
            
            return (
              <div key={month.toString()} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{format(month, 'MMM')}</h3>
                  <div className="text-sm text-gray-500">{monthPosts.length} posts</div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center text-gray-400 font-medium p-1">{day}</div>
                  ))}
                  
                  {Array.from({ length: 42 }, (_, i) => {
                    const date = addDays(startOfWeek(monthStart), i);
                    const isCurrentMonth = isSameMonth(date, month);
                    const dayPosts = getPostsForDate(date).filter(post => selectedPlatforms.includes(post.platform));
                    
                    return (
                      <div
                        key={date.toString()}
                        className={`
                          p-1 text-center rounded cursor-pointer transition-colors
                          ${isCurrentMonth ? 'text-gray-800 hover:bg-blue-50' : 'text-gray-300'}
                          ${isSameDay(date, new Date()) ? 'bg-blue-100 text-blue-600 font-bold' : ''}
                          ${dayPosts.length > 0 ? 'bg-purple-50 border border-purple-200' : ''}
                        `}
                        onClick={() => {
                          setCurrentDate(date);
                          setView('day');
                        }}
                      >
                        <div>{format(date, 'd')}</div>
                        {dayPosts.length > 0 && (
                          <div className="w-1 h-1 bg-purple-500 rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Schedule View Component
  const ScheduleView = () => {
    const sortedPosts = posts
      .filter(post => selectedPlatforms.includes(post.platform))
      .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    
    // Group posts by date
    const groupedPosts = sortedPosts.reduce((acc, post) => {
      const dateKey = format(parseISO(post.datetime), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(post);
      return acc;
    }, {} as Record<string, typeof posts>);
    
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Schedule</h3>
          <p className="text-sm text-gray-600">All upcoming content</p>
        </div>
        
        {/* Schedule List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedPosts).map(([dateKey, datePosts]) => {
            const dateObj = parseISO(dateKey + 'T00:00:00');
            const isToday = isSameDay(dateObj, new Date());
            
            return (
              <div key={dateKey} className="border-b border-gray-100 last:border-b-0">
                {/* Date Header */}
                <div className={`sticky top-0 z-10 px-4 py-3 border-b border-gray-200 ${
                  isToday ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`text-sm font-semibold ${
                      isToday ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {format(dateObj, 'EEEE, MMMM d, yyyy')}
                    </div>
                    {isToday && (
                      <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        Today
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Events for this date */}
                <div className="divide-y divide-gray-100">
                  {datePosts.map((post) => {
                    const config = PLATFORM_COLORS[post.platform];
                    const postTime = parseISO(post.datetime);
                    
                    return (
                      <TooltipProvider key={post.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-4">
                              {/* Time */}
                              <div className="text-sm text-gray-500 font-medium w-16 flex-shrink-0">
                                {format(postTime, 'h:mm a')}
                              </div>
                              
                              {/* Event Color Bar */}
                              <div 
                                className="w-1 h-12 rounded-full flex-shrink-0"
                                style={{ 
                                  backgroundColor: config?.color === 'rainbow' ? '#8B5CF6' : config?.color || '#6B7280'
                                }}
                              />
                              
                              {/* Event Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {post.title}
                                  </h4>
                                  <span className="text-xs text-gray-500">
                                    {config?.name}
                                  </span>
                                </div>
                                {post.caption && (
                                  <p className="text-xs text-gray-600 truncate">
                                    {post.caption}
                                  </p>
                                )}
                              </div>
                              
                              {/* Status */}
                              <div className="flex-shrink-0">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  post.status === 'published' 
                                    ? 'bg-green-100 text-green-700' 
                                    : post.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {post.status}
                                </span>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <PostTooltip post={post} />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            );
          })}
          
          {/* Empty State */}
          {sortedPosts.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled content</h3>
                <p className="text-gray-500">Posts you schedule will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Calendar Integration Component
  const CalendarIntegration = () => {
    const [showIntegrations, setShowIntegrations] = useState(false);
    
    const integrations = [
      { name: 'Google Calendar', icon: '🟢', connected: true },
      { name: 'Outlook Calendar', icon: '🔵', connected: false },
      { name: 'Calendly', icon: '🟠', connected: true },
      { name: 'Apple Calendar', icon: '⚫', connected: false },
      { name: 'Zoom Scheduler', icon: '🔷', connected: false }
    ];
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowIntegrations(!showIntegrations)}
          className="flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Integrations</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showIntegrations ? 'rotate-180' : ''}`} />
        </Button>
        
        {showIntegrations && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Calendar Integrations</h4>
              <div className="space-y-2">
                {integrations.map(integration => (
                  <div key={integration.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span>{integration.icon}</span>
                      <span className="text-sm font-medium">{integration.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant={integration.connected ? "default" : "outline"}
                      className="text-xs px-2 py-1"
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Visual Scheduler
          </CardTitle>
          
          <div className="flex items-center space-x-4">
            {/* View Toggle - Google Calendar Style */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white">
              {[
                { key: 'day', label: 'Day' },
                { key: '4days', label: '4 Days' },

                { key: 'week', label: 'Week' },
                { key: 'month', label: 'Month' },
                { key: 'year', label: 'Year' },
                { key: 'schedule', label: 'Schedule' }
              ].map((viewOption, index) => (
                <Button
                  key={viewOption.key}
                  variant={view === viewOption.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView(viewOption.key as typeof view)}
                  className={`rounded-none px-3 py-1 text-xs ${
                    index === 0 ? 'rounded-l-lg' : ''
                  } ${
                    index === 5 ? 'rounded-r-lg' : ''
                  }`}
                >
                  {viewOption.label}
                </Button>
              ))}
            </div>
            
            {/* Calendar Integration */}
            <CalendarIntegration />
            
            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  switch (view) {
                    case 'day':
                      setCurrentDate(addDays(currentDate, -1));
                      break;
                    case '4days':
                      setCurrentDate(addDays(currentDate, -4));
                      break;
                    case 'week':
                      setCurrentDate(subWeeks(currentDate, 1));
                      break;
                    case 'month':
                      setCurrentDate(subMonths(currentDate, 1));
                      break;
                    case 'year':
                      setCurrentDate(addDays(currentDate, -365));
                      break;
                    case 'schedule':
                      setCurrentDate(subWeeks(currentDate, 1));
                      break;
                  }
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="text-lg font-semibold min-w-[200px] text-center">
                {view === 'day' 
                  ? format(currentDate, 'EEEE, MMMM dd, yyyy')
                  : view === '4days'
                  ? `${format(currentDate, 'MMM dd')} - ${format(addDays(currentDate, 3), 'MMM dd, yyyy')}`
                  : view === 'week' 
                  ? `${format(startOfWeek(currentDate), 'MMM dd')} - ${format(addDays(startOfWeek(currentDate), 6), 'MMM dd, yyyy')}`
                  : view === 'month'
                  ? format(currentDate, 'MMMM yyyy')
                  : view === 'year'
                  ? format(currentDate, 'yyyy')
                  : format(currentDate, 'MMMM yyyy')
                }
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  switch (view) {
                    case 'day':
                      setCurrentDate(addDays(currentDate, 1));
                      break;
                    case '4days':
                      setCurrentDate(addDays(currentDate, 4));
                      break;
                    case 'week':
                      setCurrentDate(addWeeks(currentDate, 1));
                      break;
                    case 'month':
                      setCurrentDate(addMonths(currentDate, 1));
                      break;
                    case 'year':
                      setCurrentDate(addDays(currentDate, 365));
                      break;
                    case 'schedule':
                      setCurrentDate(addWeeks(currentDate, 1));
                      break;
                  }
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {/* Enhanced Control Panel */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center justify-between mb-4">
          {/* Current Time Display */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm border">
              <Globe className="w-4 h-4 text-blue-500" />
              <div className="text-sm">
                <div className="font-semibold text-gray-700">GMT-05</div>
                <div className="text-xs text-gray-500">
                  {format(currentTime, 'HH:mm:ss')}
                </div>
              </div>
            </div>
            
            {/* Holiday Indicator */}
            {(() => {
              const holiday = getHolidayForDate(currentDate);
              return holiday ? (
                <div className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${
                  holiday.type === 'federal' ? 'bg-blue-100 text-blue-700' :
                  holiday.type === 'national' ? 'bg-green-100 text-green-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  <span className="text-lg">{holiday.emoji}</span>
                  <span className="text-sm font-medium">{holiday.name}</span>
                </div>
              ) : null;
            })()}
          </div>

          {/* Platform Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">Platforms:</span>
            <div className="flex items-center space-x-2">
              {Object.entries(PLATFORM_COLORS).map(([platform, config]) => (
                <TooltipProvider key={platform}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => togglePlatform(platform)}
                        className={`
                          flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                          ${selectedPlatforms.includes(platform)
                            ? 'text-white shadow-md scale-105'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                          }
                        `}
                        style={{
                          backgroundColor: selectedPlatforms.includes(platform) 
                            ? (config.color === 'rainbow' ? '#8B5CF6' : config.color)
                            : undefined
                        }}
                      >
                        <span>{config.emoji}</span>
                        <span>{config.name}</span>
                        {selectedPlatforms.includes(platform) && (
                          <span className="ml-1 bg-white/20 rounded-full px-1.5 py-0.5 text-xs">
                            {getPlatformCounts(
                              view === 'week' ? getWeekDays()[0] : startOfMonth(currentDate),
                              view === 'week' ? getWeekDays()[6] : endOfMonth(currentDate)
                            )[platform] || 0}
                          </span>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">{config.name}</div>
                        <div className="text-xs text-gray-500">
                          {getPlatformCounts(
                            view === 'week' ? getWeekDays()[0] : startOfMonth(currentDate),
                            view === 'week' ? getWeekDays()[6] : endOfMonth(currentDate)
                          )[platform] || 0} posts this {view}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Summary for Current View */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>
            Showing {selectedPlatforms.length} of {Object.keys(PLATFORM_COLORS).length} platforms
          </div>
          <div>
            {Object.values(getPlatformCounts(
              view === 'week' ? getWeekDays()[0] : startOfMonth(currentDate),
              view === 'week' ? getWeekDays()[6] : endOfMonth(currentDate)
            )).reduce((sum, count) => sum + count, 0)} total posts this {view}
          </div>
        </div>
      </div>

      <CardContent className="p-0 h-[900px] overflow-hidden">
        {view === 'day' && <DayView />}
        {view === '4days' && <MultiDayView days={getFourDays()} />}

        {view === 'week' && <WeekView />}
        {view === 'month' && <MonthView />}
        {view === 'year' && <YearView />}
        {view === 'schedule' && <ScheduleView />}
      </CardContent>
    </Card>
  );
};

export default EnhancedScheduler;