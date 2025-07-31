import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, Target, Globe, Zap, Calendar, BarChart3, Filter } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface GeoSmartPageProps {
  currentPersona?: string;
}

interface LocationData {
  city: string;
  state: string;
  engagement: number;
  leads: number;
  revenue: string;
  trending: boolean;
  growth: string;
}

interface CampaignData {
  name: string;
  location: string;
  reach: number;
  engagement: string;
  budget: string;
  status: 'active' | 'paused' | 'completed';
  type: string;
}

export default function GeoSmartPage({ currentPersona = 'kemar' }: GeoSmartPageProps) {
  const { isAuthenticated, isDemoMode } = useAuth();
  const actualBetaUser = isAuthenticated && !isDemoMode;
  
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  // Persona-specific location data
  const getLocationData = (): LocationData[] => {
    // For beta users, return empty data
    if (actualBetaUser) return [];
    const baseData = {
      kemar: [
        { city: 'San Francisco', state: 'CA', engagement: 87, leads: 234, revenue: '$45,000', trending: true, growth: '+23%' },
        { city: 'New York', state: 'NY', engagement: 92, leads: 412, revenue: '$78,000', trending: true, growth: '+18%' },
        { city: 'Austin', state: 'TX', engagement: 78, leads: 189, revenue: '$32,000', trending: false, growth: '+12%' },
        { city: 'Miami', state: 'FL', engagement: 85, leads: 267, revenue: '$41,000', trending: true, growth: '+27%' },
        { city: 'Seattle', state: 'WA', engagement: 81, leads: 198, revenue: '$38,000', trending: false, growth: '+15%' }
      ],
      karen: [
        { city: 'Beverly Hills', state: 'CA', engagement: 94, leads: 156, revenue: '$890,000', trending: true, growth: '+31%' },
        { city: 'Manhattan', state: 'NY', engagement: 89, leads: 198, revenue: '$1,200,000', trending: true, growth: '+28%' },
        { city: 'Scottsdale', state: 'AZ', engagement: 76, leads: 123, revenue: '$670,000', trending: false, growth: '+19%' },
        { city: 'Naples', state: 'FL', engagement: 82, leads: 145, revenue: '$780,000', trending: true, growth: '+24%' },
        { city: 'Aspen', state: 'CO', engagement: 91, leads: 87, revenue: '$1,100,000', trending: true, growth: '+35%' }
      ],
      sarah: [
        { city: 'Los Angeles', state: 'CA', engagement: 88, leads: 287, revenue: '$156,000', trending: true, growth: '+26%' },
        { city: 'Dallas', state: 'TX', engagement: 84, leads: 234, revenue: '$134,000', trending: false, growth: '+21%' },
        { city: 'Atlanta', state: 'GA', engagement: 79, leads: 198, revenue: '$112,000', trending: true, growth: '+18%' },
        { city: 'Phoenix', state: 'AZ', engagement: 86, leads: 256, revenue: '$145,000', trending: true, growth: '+29%' },
        { city: 'Chicago', state: 'IL', engagement: 82, leads: 189, revenue: '$127,000', trending: false, growth: '+16%' }
      ],
      marco: [
        { city: 'Boston', state: 'MA', engagement: 91, leads: 456, revenue: '$78,000', trending: true, growth: '+33%' },
        { city: 'Philadelphia', state: 'PA', engagement: 87, leads: 398, revenue: '$67,000', trending: true, growth: '+24%' },
        { city: 'Portland', state: 'OR', engagement: 83, leads: 234, revenue: '$52,000', trending: false, growth: '+19%' },
        { city: 'Nashville', state: 'TN', engagement: 89, leads: 367, revenue: '$71,000', trending: true, growth: '+28%' },
        { city: 'Denver', state: 'CO', engagement: 85, leads: 289, revenue: '$58,000', trending: true, growth: '+22%' }
      ],
      alex: [
        { city: 'San Diego', state: 'CA', engagement: 93, leads: 198, revenue: '$89,000', trending: true, growth: '+31%' },
        { city: 'Tampa', state: 'FL', engagement: 87, leads: 234, revenue: '$76,000', trending: true, growth: '+25%' },
        { city: 'Charlotte', state: 'NC', engagement: 81, leads: 167, revenue: '$63,000', trending: false, growth: '+17%' },
        { city: 'Las Vegas', state: 'NV', engagement: 88, leads: 289, revenue: '$84,000', trending: true, growth: '+29%' },
        { city: 'Houston', state: 'TX', engagement: 84, leads: 212, revenue: '$71,000', trending: false, growth: '+20%' }
      ],
      david: [
        { city: 'Detroit', state: 'MI', engagement: 89, leads: 345, revenue: '$234,000', trending: true, growth: '+27%' },
        { city: 'Cleveland', state: 'OH', engagement: 85, leads: 298, revenue: '$198,000', trending: true, growth: '+23%' },
        { city: 'Indianapolis', state: 'IN', engagement: 82, leads: 234, revenue: '$167,000', trending: false, growth: '+18%' },
        { city: 'Milwaukee', state: 'WI', engagement: 86, leads: 267, revenue: '$189,000', trending: true, growth: '+25%' },
        { city: 'Kansas City', state: 'MO', engagement: 83, leads: 198, revenue: '$156,000', trending: false, growth: '+21%' }
      ]
    };

    return baseData[currentPersona as keyof typeof baseData] || baseData.kemar;
  };

  // Persona-specific campaign data
  const getCampaignData = (): CampaignData[] => {
    // For beta users, return empty data
    if (actualBetaUser) return [];
    
    const baseData = {
      kemar: [
        { name: 'Leadership Summit Series', location: 'San Francisco, CA', reach: 45000, engagement: '8.7%', budget: '$12,000', status: 'active' as const, type: 'Event Marketing' },
        { name: 'Executive Coaching Webinar', location: 'New York, NY', reach: 67000, engagement: '12.3%', budget: '$8,500', status: 'active' as const, type: 'Digital Marketing' },
        { name: 'Speaking Engagement Promo', location: 'Austin, TX', reach: 32000, engagement: '6.8%', budget: '$5,200', status: 'paused' as const, type: 'Social Media' },
        { name: 'Corporate Training Workshop', location: 'Miami, FL', reach: 28000, engagement: '9.1%', budget: '$7,800', status: 'completed' as const, type: 'Event Marketing' }
      ],
      karen: [
        { name: 'Luxury Home Showcase', location: 'Beverly Hills, CA', reach: 23000, engagement: '15.2%', budget: '$25,000', status: 'active' as const, type: 'Property Marketing' },
        { name: 'Market Report Campaign', location: 'Manhattan, NY', reach: 34000, engagement: '11.7%', budget: '$18,000', status: 'active' as const, type: 'Content Marketing' },
        { name: 'First-Time Buyer Series', location: 'Scottsdale, AZ', reach: 19000, engagement: '8.9%', budget: '$12,000', status: 'completed' as const, type: 'Educational' },
        { name: 'Investment Property Guide', location: 'Naples, FL', reach: 28000, engagement: '13.4%', budget: '$15,500', status: 'active' as const, type: 'Lead Generation' }
      ],
      sarah: [
        { name: 'Anti-Aging Treatment Campaign', location: 'Los Angeles, CA', reach: 41000, engagement: '14.6%', budget: '$22,000', status: 'active' as const, type: 'Treatment Marketing' },
        { name: 'Skincare Consultation Drive', location: 'Dallas, TX', reach: 35000, engagement: '12.8%', budget: '$18,500', status: 'active' as const, type: 'Service Promotion' },
        { name: 'Wellness Workshop Series', location: 'Atlanta, GA', reach: 28000, engagement: '10.3%', budget: '$14,000', status: 'paused' as const, type: 'Educational' },
        { name: 'Holiday Beauty Package', location: 'Phoenix, AZ', reach: 32000, engagement: '16.7%', budget: '$19,000', status: 'completed' as const, type: 'Seasonal Campaign' }
      ],
      marco: [
        { name: 'Italian Wine Dinner Series', location: 'Boston, MA', reach: 18000, engagement: '18.9%', budget: '$8,500', status: 'active' as const, type: 'Event Marketing' },
        { name: 'Pasta Making Workshop', location: 'Philadelphia, PA', reach: 22000, engagement: '16.3%', budget: '$6,200', status: 'active' as const, type: 'Experience Marketing' },
        { name: 'Seasonal Menu Launch', location: 'Portland, OR', reach: 15000, engagement: '14.7%', budget: '$4,800', status: 'completed' as const, type: 'Product Launch' },
        { name: 'Chef\'s Table Experience', location: 'Nashville, TN', reach: 19000, engagement: '20.1%', budget: '$7,500', status: 'active' as const, type: 'Premium Experience' }
      ],
      alex: [
        { name: 'Summer Fitness Challenge', location: 'San Diego, CA', reach: 52000, engagement: '19.3%', budget: '$16,000', status: 'active' as const, type: 'Challenge Campaign' },
        { name: 'Personal Training Promo', location: 'Tampa, FL', reach: 31000, engagement: '14.8%', budget: '$11,500', status: 'active' as const, type: 'Service Promotion' },
        { name: 'Nutrition Workshop Series', location: 'Charlotte, NC', reach: 24000, engagement: '12.6%', budget: '$8,200', status: 'paused' as const, type: 'Educational' },
        { name: 'New Year Transformation', location: 'Las Vegas, NV', reach: 43000, engagement: '17.9%', budget: '$14,800', status: 'completed' as const, type: 'Seasonal Campaign' }
      ],
      david: [
        { name: 'End of Year Clearance', location: 'Detroit, MI', reach: 67000, engagement: '13.2%', budget: '$35,000', status: 'active' as const, type: 'Sales Event' },
        { name: 'New Model Launch', location: 'Cleveland, OH', reach: 45000, engagement: '11.7%', budget: '$28,000', status: 'active' as const, type: 'Product Launch' },
        { name: 'Service Department Promo', location: 'Indianapolis, IN', reach: 32000, engagement: '9.8%', budget: '$18,000', status: 'paused' as const, type: 'Service Marketing' },
        { name: 'Trade-In Value Campaign', location: 'Milwaukee, WI', reach: 38000, engagement: '15.4%', budget: '$22,500', status: 'completed' as const, type: 'Trade-In Program' }
      ]
    };

    return baseData[currentPersona as keyof typeof baseData] || baseData.kemar;
  };

  const locationData = getLocationData();
  const campaignData = getCampaignData();

  const getPersonaTitle = () => {
    const titles = {
      kemar: 'Speaker Performance by Location',
      karen: 'Real Estate Market Analysis',
      sarah: 'MedSpa Geographic Performance',
      marco: 'Restaurant Location Analytics',
      alex: 'Fitness Market Penetration',
      david: 'Auto Sales Territory Performance'
    };
    return titles[currentPersona as keyof typeof titles] || titles.kemar;
  };

  const getPersonaDescription = () => {
    const descriptions = {
      kemar: 'Track your speaking engagement performance across different markets and identify high-potential cities for future events.',
      karen: 'Analyze real estate market trends and client engagement across different neighborhoods and price points.',
      sarah: 'Monitor treatment demand and client acquisition across different demographics and geographic regions.',
      marco: 'Understand customer preferences and dining trends across different locations and customer segments.',
      alex: 'Track fitness program adoption and member growth across different markets and demographics.',
      david: 'Analyze vehicle sales performance and customer preferences across different territories and market segments.'
    };
    return descriptions[currentPersona as keyof typeof descriptions] || descriptions.kemar;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  GeoSmart Analytics
                </h1>
                <p className="text-purple-200 mt-1">
                  {getPersonaTitle()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeframe} 
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white backdrop-blur-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Geographic Intelligence</h3>
              <p className="text-purple-200 leading-relaxed">
                {getPersonaDescription()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total Locations</p>
                <p className="text-2xl font-bold text-white">{locationData.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total Leads</p>
                <p className="text-2xl font-bold text-white">{locationData.reduce((sum, loc) => sum + loc.leads, 0).toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Avg Engagement</p>
                <p className="text-2xl font-bold text-white">{Math.round(locationData.reduce((sum, loc) => sum + loc.engagement, 0) / locationData.length)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Trending Markets</p>
                <p className="text-2xl font-bold text-white">{locationData.filter(loc => loc.trending).length}</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Location Performance Table */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Location Performance</h2>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedMetric} 
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm backdrop-blur-sm"
                >
                  <option value="engagement">Engagement</option>
                  <option value="leads">Leads</option>
                  <option value="revenue">Revenue</option>
                </select>
                <Filter className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4 text-purple-200 font-medium">Location</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Engagement</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Leads</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Revenue</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Growth</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {locationData.map((location, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">{location.city}</p>
                          <p className="text-purple-200 text-sm">{location.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${location.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{location.engagement}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-white">{location.leads.toLocaleString()}</td>
                    <td className="p-4 text-white font-medium">{location.revenue}</td>
                    <td className="p-4">
                      <span className="text-green-400 font-medium">{location.growth}</span>
                    </td>
                    <td className="p-4">
                      {location.trending ? (
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending
                        </span>
                      ) : (
                        <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Stable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">Active Geo-Targeted Campaigns</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaignData.map((campaign, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                      <p className="text-purple-200 text-sm flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {campaign.location}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : campaign.status === 'paused'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-200">Reach</p>
                      <p className="text-white font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-purple-200">Engagement</p>
                      <p className="text-white font-medium">{campaign.engagement}</p>
                    </div>
                    <div>
                      <p className="text-purple-200">Budget</p>
                      <p className="text-white font-medium">{campaign.budget}</p>
                    </div>
                    <div>
                      <p className="text-purple-200">Type</p>
                      <p className="text-white font-medium">{campaign.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}