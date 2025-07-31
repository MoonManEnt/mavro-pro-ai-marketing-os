import React from 'react';

export const BillingSettingsCard = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Billing Settings</h2>
      <p>Current Plan: Pro+</p>
      <p>Renewal Date: 2025-08-15</p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Manage Subscription</button>
    </div>
  );
};
