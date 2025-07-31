export function exportReportAsCSV(data, filename = 'report.csv') {
  const csv = Object.keys(data[0]).join(',') + '\n' +
              data.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
