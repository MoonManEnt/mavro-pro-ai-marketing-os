import React, { useState } from 'react';
import { Download, FileText, Table, Mail, Calendar, X, CheckCircle } from 'lucide-react';

interface ExportPanelProps {
  onClose: () => void;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Comprehensive analytics report',
      icon: FileText,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Raw data export for analysis',
      icon: Table,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      description: 'Formatted spreadsheet with charts',
      icon: Table,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Log export action for ViVi learning
      const exportLog = {
        event: 'report_exported',
        format: selectedFormat,
        timestamp: Date.now(),
        source: 'foursight_dashboard'
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('vivi-insights') || '[]');
      existingLogs.push(exportLog);
      localStorage.setItem('vivi-insights', JSON.stringify(existingLogs));
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate export based on format
      if (selectedFormat === 'pdf') {
        // Generate PDF report
        window.print();
      } else if (selectedFormat === 'csv') {
        // Generate CSV download
        const csvContent = generateCSVContent();
        downloadFile(csvContent, 'foursight-analytics.csv', 'text/csv');
      } else if (selectedFormat === 'excel') {
        // Generate Excel download (simplified as CSV for demo)
        const csvContent = generateCSVContent();
        downloadFile(csvContent, 'foursight-analytics.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }
      
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateCSVContent = () => {
    const headers = ['Platform', 'Engagements', 'Reach', 'Impressions', 'CTR'];
    const data = [
      ['Instagram', '2400', '15200', '24800', '3.8%'],
      ['TikTok', '1800', '12100', '19600', '4.2%'],
      ['Facebook', '1200', '8500', '14200', '2.9%'],
      ['LinkedIn', '900', '6200', '10800', '3.1%'],
      ['YouTube', '750', '5100', '8900', '2.7%'],
      ['X (Twitter)', '600', '4200', '7300', '2.4%']
    ];
    
    const csvRows = [headers, ...data];
    return csvRows.map(row => row.join(',')).join('\n');
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleEmailSummary = () => {
    const subject = 'FourSIGHT™ Analytics Summary';
    const body = `Please find the analytics summary attached.\n\nKey metrics:\n- Total Engagements: 8,250\n- Average CTR: 3.2%\n- Best Performing Platform: Instagram\n\nGenerated on: ${new Date().toLocaleString()}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  const handleCalendarReminder = () => {
    const title = 'Review FourSIGHT™ Analytics';
    const details = 'Review weekly performance metrics and plan content strategy adjustments';
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // Next week
    const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 minutes later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(details)}`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-4 shadow-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-gray-900">Export Analytics</h2>
              <p className="text-gray-600">Download your FourSIGHT™ performance data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!exportComplete ? (
          <>
            {/* Format Selection */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Export Format</h3>
              {exportFormats.map(format => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedFormat === format.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-r ${format.color} rounded-xl`}>
                      <format.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">{format.name}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Export...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Export {exportFormats.find(f => f.id === selectedFormat)?.name}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleEmailSummary}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Summary</span>
                </button>
                
                <button
                  onClick={handleCalendarReminder}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Set Reminder</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Export Complete */
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Export Complete!</h3>
            <p className="text-gray-600">Your analytics report has been generated successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportPanel;