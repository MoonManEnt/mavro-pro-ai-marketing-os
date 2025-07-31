import React from 'react';
import { CreditCard, Calendar, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const BillingSettingsCard = () => {
  return (
    <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900">Billing Settings</span>
        </CardTitle>
        <CardDescription>Manage your subscription and billing preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-bold text-gray-900">Current Plan</p>
              <p className="text-sm text-gray-600">Pro+</p>
            </div>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 font-bold">
            Active
          </Badge>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-bold text-gray-900">Renewal Date</p>
              <p className="text-sm text-gray-600">August 15, 2025</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-bold">
            21 days
          </Badge>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Manage Subscription
        </Button>
      </CardContent>
    </Card>
  );
};