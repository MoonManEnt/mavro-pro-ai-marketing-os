export interface ExportData {
  [key: string]: string | number;
}

export function exportReportAsCSV(data: ExportData[], filename = 'report.csv'): void {
  if (!data || data.length === 0) {
    console.warn('No data provided for CSV export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export function exportReportAsPDF(
  elementId: string, 
  filename = 'report.pdf'
): void {
  // This would integrate with a PDF library like jsPDF or html2pdf
  // For now, we'll show a message about PDF export
  console.log('PDF export functionality would be implemented here');
  alert('PDF export feature coming soon! Use CSV export for now.');
}

export function generateReportSummary(data: any): ExportData[] {
  return [
    { Section: 'Overview', Metric: 'Total Reach', Value: data.reach },
    { Section: 'Overview', Metric: 'Leads Generated', Value: data.leads },
    { Section: 'Overview', Metric: 'Active Campaigns', Value: data.campaigns },
    { Section: 'Overview', Metric: 'Conversion Rate', Value: `${data.conversionRate}%` },
    { Section: 'ViVi Impact', Metric: 'AI Decisions Made', Value: data.viviImpact?.decisionsCount || 0 },
    { Section: 'ViVi Impact', Metric: 'Revenue Impact', Value: `$${data.viviImpact?.revenueImpact || 0}` },
    { Section: 'ViVi Impact', Metric: 'Time Saved (hours)', Value: data.viviImpact?.timesSaved || 0 },
  ];
}