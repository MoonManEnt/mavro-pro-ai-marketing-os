import React from 'react';
import { Download, FileText, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const ExportDataCard = () => {
  const exportOptions = [
    { name: 'Export CRM Leads', format: '.csv', icon: Database, color: 'from-green-500 to-emerald-600' },
    { name: 'Export Campaigns', format: '.csv', icon: FileText, color: 'from-blue-500 to-indigo-600' },
    { name: 'Export Mission Log', format: '.json', icon: Download, color: 'from-orange-500 to-amber-600' }
  ];

  const handleExport = (exportType) => {
    alert(`Exporting ${exportType}...`);
  };

  return (
    <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Download className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900">Export Your Data</span>
        </CardTitle>
        <CardDescription>Download your data in various formats for backup or analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {exportOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleExport(option.name)}
              className="w-full justify-start rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <div className={`w-6 h-6 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center mr-3`}>
                <IconComponent className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium">{option.name}</span>
              <span className="ml-auto text-xs text-gray-500 font-mono">{option.format}</span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};