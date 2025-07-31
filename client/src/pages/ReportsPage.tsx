import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Target, MapPin, Zap, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OverviewMetricsCard } from '@/components/reports/OverviewMetricsCard';
import { PlatformPerformanceCard } from '@/components/reports/PlatformPerformanceCard';
import { PostFormatEfficacyCard } from '@/components/reports/PostFormatEfficacyCard';
import { CampaignOutcomeCard } from '@/components/reports/CampaignOutcomeCard';
import { GeoRegionBreakoutCard } from '@/components/reports/GeoRegionBreakoutCard';
import { LeadPipelineCard } from '@/components/reports/LeadPipelineCard';
import { ViViImpactCard } from '@/components/reports/ViViImpactCard';
import { ViViRecommendationsPanel } from '@/components/reports/ViViRecommendationsPanel';
import { useReportData } from '@/hooks/useReportData';
import { exportReportAsCSV } from '@/services/reportExportService';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const reportData = useReportData({ dateRange, platform: selectedPlatform, format: selectedFormat });

  const handleExportReport = () => {
    const exportData = [
      { metric: 'Total Reach', value: reportData.reach },
      { metric: 'Leads Generated', value: reportData.leads },
      { metric: 'Campaigns Launched', value: reportData.campaigns },
      { metric: 'Top Platform', value: reportData.topPlatform },
      { metric: 'Conversion Rate', value: `${reportData.conversionRate}%` },
    ];
    exportReportAsCSV(exportData, `mavro-report-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-8">
      {/* Executive Command Header */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">FourSIGHT™ Reports</h1>
              <p className="text-gray-600 font-medium">Advanced analytics and ViVi intelligence insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-sm text-gray-600 font-medium">Live Analysis</span>
          </div>
        </div>

        {/* Executive Command Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-36 rounded-xl border-2 border-gray-300 hover:border-purple-400 transition-colors">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-36 rounded-xl border-2 border-gray-300 hover:border-purple-400 transition-colors">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-gray-600" />
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-36 rounded-xl border-2 border-gray-300 hover:border-purple-400 transition-colors">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="reel">Reels</SelectItem>
                <SelectItem value="story">Stories</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleExportReport}
            className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive Command Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Overview Metrics - Full Width Top */}
        <div className="lg:col-span-2 xl:col-span-3">
          <OverviewMetricsCard data={reportData} />
        </div>

        {/* Platform Performance */}
        <div className="lg:col-span-1">
          <PlatformPerformanceCard data={reportData.platformStats} />
        </div>

        {/* Post Format Efficacy */}
        <div className="lg:col-span-1">
          <PostFormatEfficacyCard data={reportData.formatStats} />
        </div>

        {/* Campaign Outcomes */}
        <div className="lg:col-span-1">
          <CampaignOutcomeCard data={reportData.campaignStats} />
        </div>

        {/* Geo Region Breakout */}
        <div className="lg:col-span-1">
          <GeoRegionBreakoutCard data={reportData.geoStats} />
        </div>

        {/* Lead Pipeline */}
        <div className="lg:col-span-1">
          <LeadPipelineCard data={reportData.leadStats} />
        </div>

        {/* ViVi Impact */}
        <div className="lg:col-span-1">
          <ViViImpactCard data={reportData.viviImpact} />
        </div>
      </div>

      {/* Executive Command ViVi Recommendations - Full Width Bottom */}
      <div className="w-full">
        <ViViRecommendationsPanel data={reportData.recommendations} />
      </div>
    </div>
  );
};

export default ReportsPage;