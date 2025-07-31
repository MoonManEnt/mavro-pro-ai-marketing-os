import React from 'react';
import { Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const featureDescriptions = {
  viviVoiceEnabled: 'Enable voice interactions with ViVi AI assistant',
  autoSaveEnabled: 'Automatically save your work and settings',
  notificationsEnabled: 'Receive real-time notifications and alerts',
  darkModeEnabled: 'Use dark theme for better visibility in low light',
  advancedAnalytics: 'Enable detailed performance analytics and insights',
  realTimeSync: 'Sync data across all your devices in real-time',
  aiSuggestions: 'Get AI-powered content and strategy suggestions',
  performanceMonitoring: 'Monitor system performance and optimization'
};

export const FeatureTogglesCard = () => {
  const { features, updateFeature } = useSettings();

  const formatFeatureName = (key) => {
    return key.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/enabled/i, '')
      .trim();
  };

  return (
    <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900">Feature Toggles</span>
        </CardTitle>
        <CardDescription>Enable or disable platform features to customize your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.keys(features).map((key) => (
            <div key={key} className="flex items-start justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center space-x-2 mb-1">
                  {features[key] ? (
                    <ToggleRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-4 h-4 text-gray-400" />
                  )}
                  <h4 className="font-bold text-gray-900 text-sm">
                    {formatFeatureName(key)}
                  </h4>
                </div>
                <p className="text-xs text-gray-600">
                  {featureDescriptions[key] || 'Toggle this feature on or off'}
                </p>
              </div>
              <Switch
                checked={features[key]}
                onCheckedChange={(checked) => updateFeature(key, checked)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-indigo-600"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-800">Feature Impact</span>
          </div>
          <p className="text-xs text-yellow-700">
            Disabling certain features may affect ViVi AI performance and automation capabilities. 
            Enable advanced features for the best experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};