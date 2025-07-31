import React from 'react';

export const IntegrationsCard = () => {
  const platforms = [
    { name: 'Instagram', status: 'Connected' },
    { name: 'TikTok', status: 'Not Connected' },
    { name: 'Facebook', status: 'Connected' },
    { name: 'Google Business', status: 'Connected' },
    { name: 'YouTube', status: 'Not Connected' },
    { name: 'Stripe', status: 'Connected' },
    { name: 'Calendly', status: 'Not Connected' }
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Platform Integrations</h2>
      <ul>
        {platforms.map((p, i) => (
          <li key={i} className="flex justify-between items-center mb-1">
            <span>{p.name}</span>
            <span className={`text-sm ${p.status === 'Connected' ? 'text-green-500' : 'text-red-500'}`}>{p.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
