import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Settings, Palette, Bell, Shield, Zap, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

const SettingsDashboard: React.FC = () => {
  const { currentMode, setCurrentMode } = useApp();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    campaigns: true,
    analytics: true,
    leads: true
  });
  const [aiIntensity, setAiIntensity] = useState([75]);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          value: theme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ],
          onChange: (value: string) => setTheme(value as 'light' | 'dark')
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'email-notifications',
          label: 'Email Notifications',
          type: 'switch',
          value: notifications.email,
          onChange: (value: boolean) => handleNotificationChange('email', value)
        },
        {
          id: 'push-notifications',
          label: 'Push Notifications',
          type: 'switch',
          value: notifications.push,
          onChange: (value: boolean) => handleNotificationChange('push', value)
        },
        {
          id: 'sms-notifications',
          label: 'SMS Notifications',
          type: 'switch',
          value: notifications.sms,
          onChange: (value: boolean) => handleNotificationChange('sms', value)
        },
        {
          id: 'campaign-alerts',
          label: 'Campaign Alerts',
          type: 'switch',
          value: notifications.campaigns,
          onChange: (value: boolean) => handleNotificationChange('campaigns', value)
        }
      ]
    },
    {
      id: 'ai-settings',
      title: 'AI & Automation',
      icon: Zap,
      settings: [
        {
          id: 'ai-intensity',
          label: 'AI Suggestion Intensity',
          type: 'slider',
          value: aiIntensity,
          min: 0,
          max: 100,
          step: 5,
          onChange: (value: number[]) => setAiIntensity(value)
        },
        {
          id: 'auto-optimize',
          label: 'Auto-Optimize Campaigns',
          type: 'switch',
          value: autoOptimize,
          onChange: (value: boolean) => setAutoOptimize(value)
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          id: 'data-retention',
          label: 'Data Retention Period',
          type: 'select',
          value: dataRetention,
          options: [
            { value: '30', label: '30 days' },
            { value: '60', label: '60 days' },
            { value: '90', label: '90 days' },
            { value: '180', label: '180 days' },
            { value: '365', label: '1 year' }
          ],
          onChange: (value: string) => setDataRetention(value)
        }
      ]
    }
  ];

  const renderSetting = (setting: any) => {
    switch (setting.type) {
      case 'switch':
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={setting.id} className="text-white/90 text-sm">
              {setting.label}
            </Label>
            <Switch
              id={setting.id}
              checked={setting.value}
              onCheckedChange={setting.onChange}
            />
          </div>
        );
      
      case 'select':
        return (
          <div className="space-y-2">
            <Label htmlFor={setting.id} className="text-white/90 text-sm">
              {setting.label}
            </Label>
            <Select value={setting.value} onValueChange={setting.onChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                {setting.options.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'slider':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={setting.id} className="text-white/90 text-sm">
                {setting.label}
              </Label>
              <span className="text-white/60 text-sm">{setting.value[0]}%</span>
            </div>
            <Slider
              id={setting.id}
              value={setting.value}
              onValueChange={setting.onChange}
              min={setting.min}
              max={setting.max}
              step={setting.step}
              className="w-full"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="settings-dashboard glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center">
          <Settings className="w-5 h-5 text-sky-blue mr-2" />
          Settings & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Selector */}
        <div className="space-y-2">
          <Label className="text-white/90 text-sm">System Mode</Label>
          <Select value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              <SelectItem value="demo">Demo Mode</SelectItem>
              <SelectItem value="hybrid">Hybrid Mode</SelectItem>
              <SelectItem value="live">Live Mode</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-white/60 text-xs">
            {currentMode === 'demo' && 'Uses sample data for demonstration'}
            {currentMode === 'hybrid' && 'Combines real and sample data'}
            {currentMode === 'live' && 'Uses live data from your integrations'}
          </p>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
              <section.icon className="w-4 h-4 text-sky-blue" />
              <h3 className="text-white font-medium">{section.title}</h3>
            </div>
            
            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (settingIndex * 0.05) }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  {renderSetting(setting)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-white/20">
          <Button
            className="flex-1 bg-gradient-to-r from-sunset-orange to-golden-yellow hover:from-sunset-orange/80 hover:to-golden-yellow/80 text-white"
          >
            Save Settings
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsDashboard;
