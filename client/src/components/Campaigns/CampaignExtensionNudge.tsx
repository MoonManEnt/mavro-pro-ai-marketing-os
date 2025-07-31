import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, TrendingUp, Zap, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ExtensionAction {
  action: 'extend' | 'pivot' | 'archive';
  campaignId: string;
  campaignName?: string;
  timestamp: string;
  reason: string;
  newPostsCount?: number;
  winningFormat?: string;
  fromFormat?: string;
  toFormat?: string;
}

interface CampaignExtensionNudgeProps {
  actions: ExtensionAction[];
  onDismiss: (actionId: string) => void;
  onViewCampaign: (campaignId: string) => void;
}

const CampaignExtensionNudge: React.FC<CampaignExtensionNudgeProps> = ({
  actions,
  onDismiss,
  onViewCampaign
}) => {
  const [visibleActions, setVisibleActions] = useState<ExtensionAction[]>([]);

  useEffect(() => {
    // Filter actions from the last 24 hours
    const recent = actions.filter(action => {
      const actionTime = new Date(action.timestamp);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return actionTime > dayAgo;
    });
    setVisibleActions(recent);
  }, [actions]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'extend':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'pivot':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'archive':
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-purple-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'extend':
        return 'from-green-500 to-emerald-600';
      case 'pivot':
        return 'from-blue-500 to-indigo-600';
      case 'archive':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getActionTitle = (action: ExtensionAction) => {
    switch (action.action) {
      case 'extend':
        return 'Campaign Extended';
      case 'pivot':
        return 'Campaign Pivoted';
      case 'archive':
        return 'Campaign Archived';
      default:
        return 'Campaign Updated';
    }
  };

  const getActionDescription = (action: ExtensionAction) => {
    switch (action.action) {
      case 'extend':
        return `Added ${action.newPostsCount} new ${action.winningFormat} posts based on performance data`;
      case 'pivot':
        return `Switched from ${action.fromFormat} to ${action.toFormat} format for optimization`;
      case 'archive':
        return 'Moved to archive due to underperformance';
      default:
        return action.reason;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return date.toLocaleDateString();
  };

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {visibleActions.map((action, index) => (
        <div
          key={`${action.campaignId}-${action.timestamp}-${index}`}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${getActionColor(action.action)}`}>
                {getActionIcon(action.action)}
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 tracking-tight">
                  {getActionTitle(action)}
                </h4>
                <p className="text-xs text-gray-600 font-medium">
                  {formatTimestamp(action.timestamp)}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDismiss(`${action.campaignId}-${action.timestamp}`)}
              className="p-1 h-6 w-6 hover:bg-gray-100"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          {/* Campaign Info */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`bg-gradient-to-r ${getActionColor(action.action)} text-white font-bold text-xs`}>
                ViVi AI Action
              </Badge>
              <span className="text-xs text-gray-500 font-medium">
                Campaign: {action.campaignName || action.campaignId}
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              {getActionDescription(action)}
            </p>
          </div>

          {/* Reason */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 mb-3">
            <p className="text-xs text-gray-600 font-medium">
              <span className="font-black text-gray-900">Reason:</span> {action.reason}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onViewCampaign(action.campaignId)}
              className={`flex-1 bg-gradient-to-r ${getActionColor(action.action)} hover:opacity-90 text-white font-bold text-xs`}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View Campaign
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDismiss(`${action.campaignId}-${action.timestamp}`)}
              className="text-xs hover:bg-gray-50"
            >
              Dismiss
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignExtensionNudge;