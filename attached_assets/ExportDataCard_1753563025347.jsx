import React from 'react';

export const ExportDataCard = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Export Your Data</h2>
      <button className="block w-full text-left py-2">Export CRM Leads (.csv)</button>
      <button className="block w-full text-left py-2">Export Campaigns (.csv)</button>
      <button className="block w-full text-left py-2">Export Mission Log (.json)</button>
    </div>
  );
};
