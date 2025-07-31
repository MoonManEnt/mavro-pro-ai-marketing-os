import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const GuidedDemoCard = () => {
  const launchDemo = () => {
    alert('Launching ViVi Guided Walkthrough...');
  };

  return (
    <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Play className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900">Need a Demo?</span>
        </CardTitle>
        <CardDescription>Walk through the platform features with ViVi as your guide</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-700 font-medium">Interactive guided tour</span>
        </div>
        <Button 
          onClick={launchDemo}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <Play className="w-4 h-4 mr-2" />
          Launch Demo
        </Button>
      </CardContent>
    </Card>
  );
};