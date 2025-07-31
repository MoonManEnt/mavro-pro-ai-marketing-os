import React from 'react';
import { Zap, CheckCircle, XCircle, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const IntegrationsCard = () => {
  const platforms = [
    { name: 'Instagram', status: 'Connected', icon: '📸', color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', status: 'Not Connected', icon: '🎵', color: 'from-gray-400 to-gray-500' },
    { name: 'Facebook', status: 'Connected', icon: '📘', color: 'from-blue-500 to-blue-600' },
    { name: 'Google Business', status: 'Connected', icon: '🏢', color: 'from-green-500 to-green-600' },
    { name: 'YouTube', status: 'Not Connected', icon: '🎥', color: 'from-gray-400 to-gray-500' },
    { name: 'Stripe', status: 'Connected', icon: '💳', color: 'from-purple-500 to-indigo-600' },
    { name: 'Calendly', status: 'Not Connected', icon: '📅', color: 'from-gray-400 to-gray-500' }
  ];

  const handleConnect = (platform) => {
    alert(`Connecting to ${platform}...`);
  };

  return (
    <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900">Platform Integrations</span>
        </CardTitle>
        <CardDescription>Connect and manage your third-party platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {platforms.map((platform, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {platform.icon}
                </div>
                <span className="font-medium text-gray-900">{platform.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {platform.status === 'Connected' ? (
                  <>
                    <Badge className="bg-green-100 text-green-800 border-green-300 font-bold flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Connected</span>
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge className="bg-red-100 text-red-800 border-red-300 font-bold flex items-center space-x-1">
                      <XCircle className="w-3 h-3" />
                      <span>Not Connected</span>
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleConnect(platform.name)}
                      className="rounded-lg border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                    >
                      <Link className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};