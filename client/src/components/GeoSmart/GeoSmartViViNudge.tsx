import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Zap, 
  Target, 
  CheckCircle, 
  X, 
  Clock,
  MapPin,
  BarChart3,
  Sparkles
} from 'lucide-react';

interface ViViNudge {
  id: string;
  type: 'trend_surge' | 'engagement_spike' | 'format_opportunity' | 'boost_recommendation';
  region: string;
  zipCode: string;
  city: string;
  state: string;
  confidence: number;
  title: string;
  description: string;
  suggestedAction: string;
  impact: string;
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
  estimatedROI?: string;
}

interface GeoSmartViViNudgeProps {
  selectedRegion?: string | null;
  onActionAccept: (nudgeId: string, action: string) => void;
  onActionDismiss: (nudgeId: string) => void;
  onActionSchedule: (nudgeId: string, action: string) => void;
}

const GeoSmartViViNudge: React.FC<GeoSmartViViNudgeProps> = ({
  selectedRegion,
  onActionAccept,
  onActionDismiss,
  onActionSchedule
}) => {
  const [nudges, setNudges] = useState<ViViNudge[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingNudge, setProcessingNudge] = useState<string | null>(null);

  useEffect(() => {
    loadViViNudges();
  }, [selectedRegion]);

  const loadViViNudges = async () => {
    setLoading(true);
    try {
      const url = selectedRegion 
        ? `/api/vivi-extensions/geo-nudges?region=${selectedRegion}`
        : '/api/vivi-extensions/geo-nudges';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNudges(data.nudges || []);
        }
      } else {
        loadDemoNudges();
      }
    } catch (error) {
      console.error('Failed to load ViVi nudges:', error);
      loadDemoNudges();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoNudges = () => {
    const demoNudges: ViViNudge[] = [
      {
        id: 'nudge_001',
        type: 'engagement_spike',
        region: 'west_coast',
        zipCode: '90210',
        city: 'Beverly Hills',
        state: 'CA',
        confidence: 87,
        title: 'Engagement Spike Detected',
        description: '#luxuryfacial is trending 340% above normal in Beverly Hills area',
        suggestedAction: 'Boost next luxury facial post for 90210 ZIP code',
        impact: '+45% estimated engagement increase',
        timestamp: '2025-01-26T17:15:00.000Z',
        urgency: 'high',
        estimatedROI: '2.3x'
      },
      {
        id: 'nudge_002',
        type: 'trend_surge',
        region: 'east_coast',
        zipCode: '10001',
        city: 'New York',
        state: 'NY',
        confidence: 92,
        title: 'NYC Wellness Trend Surge',
        description: 'TikTok videos with #nycwellness seeing 5.2x engagement in Manhattan',
        suggestedAction: 'Create TikTok wellness content targeting NYC audience',
        impact: '+78% reach potential in NYC market',
        timestamp: '2025-01-26T16:45:00.000Z',
        urgency: 'high',
        estimatedROI: '3.1x'
      },
      {
        id: 'nudge_003',
        type: 'format_opportunity',
        region: 'south',
        zipCode: '33139',
        city: 'Miami Beach',
        state: 'FL',
        confidence: 74,
        title: 'Video Format Opportunity',
        description: 'Instagram Reels performing 230% better than posts in Miami Beach',
        suggestedAction: 'Convert next 3 posts to Reels format for Miami audience',
        impact: '+52% engagement rate improvement',
        timestamp: '2025-01-26T16:20:00.000Z',
        urgency: 'medium',
        estimatedROI: '1.8x'
      },
      {
        id: 'nudge_004',
        type: 'boost_recommendation',
        region: 'south',
        zipCode: '78704',
        city: 'Austin',
        state: 'TX',
        confidence: 68,
        title: 'Austin Market Boost Opportunity',
        description: 'Lower competition detected in Austin medspa market this week',
        suggestedAction: 'Increase ad spend by 30% for Austin targeting',
        impact: '+25% cost efficiency improvement',
        timestamp: '2025-01-26T15:55:00.000Z',
        urgency: 'low',
        estimatedROI: '1.6x'
      }
    ];
    setNudges(demoNudges);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'engagement_spike': return <Zap className="w-4 h-4" />;
      case 'trend_surge': return <TrendingUp className="w-4 h-4" />;
      case 'format_opportunity': return <Target className="w-4 h-4" />;
      case 'boost_recommendation': return <BarChart3 className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'engagement_spike': return 'text-yellow-600 bg-yellow-50';
      case 'trend_surge': return 'text-green-600 bg-green-50';
      case 'format_opportunity': return 'text-blue-600 bg-blue-50';
      case 'boost_recommendation': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAcceptAction = async (nudgeId: string, action: string) => {
    setProcessingNudge(nudgeId);
    try {
      await onActionAccept(nudgeId, action);
      // Remove nudge from list after accepting
      setNudges(prev => prev.filter(n => n.id !== nudgeId));
    } finally {
      setProcessingNudge(null);
    }
  };

  const handleDismissAction = async (nudgeId: string) => {
    setProcessingNudge(nudgeId);
    try {
      await onActionDismiss(nudgeId);
      // Remove nudge from list after dismissing
      setNudges(prev => prev.filter(n => n.id !== nudgeId));
    } finally {
      setProcessingNudge(null);
    }
  };

  const handleScheduleAction = async (nudgeId: string, action: string) => {
    setProcessingNudge(nudgeId);
    try {
      await onActionSchedule(nudgeId, action);
      // Update nudge status after scheduling
      setNudges(prev => prev.map(n => 
        n.id === nudgeId 
          ? { ...n, title: 'Scheduled: ' + n.title }
          : n
      ));
    } finally {
      setProcessingNudge(null);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-black text-gray-900">ViVi Intelligence</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-black text-gray-900">ViVi Intelligence</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {nudges.length} Active
          </Badge>
        </div>
        {selectedRegion && (
          <p className="text-sm text-gray-600">
            Showing insights for {selectedRegion}
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {nudges.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No active insights available</p>
            </div>
          ) : (
            nudges.map((nudge) => (
              <div
                key={nudge.id}
                className="border border-gray-200 rounded-xl p-4 space-y-3 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${getTypeColor(nudge.type)}`}>
                      {getTypeIcon(nudge.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{nudge.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {nudge.city}, {nudge.state} ({nudge.zipCode})
                          </span>
                        </div>
                        <Badge className={`text-xs ${getUrgencyColor(nudge.urgency)}`}>
                          {nudge.urgency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{formatTimestamp(nudge.timestamp)}</div>
                    <div className="text-xs font-medium text-green-600">
                      {nudge.confidence}% confidence
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">{nudge.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Suggested Action:</span>
                      <p className="text-gray-700 mt-1">{nudge.suggestedAction}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 font-medium">{nudge.impact}</span>
                      {nudge.estimatedROI && (
                        <span className="text-purple-600 font-medium">
                          Est. ROI: {nudge.estimatedROI}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptAction(nudge.id, nudge.suggestedAction)}
                    disabled={processingNudge === nudge.id}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Accept
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleScheduleAction(nudge.id, nudge.suggestedAction)}
                    disabled={processingNudge === nudge.id}
                    className="text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Schedule
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDismissAction(nudge.id)}
                    disabled={processingNudge === nudge.id}
                    className="text-gray-600 hover:text-gray-800 text-xs"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Dismiss
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeoSmartViViNudge;