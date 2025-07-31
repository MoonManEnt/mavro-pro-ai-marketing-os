import React from 'react';

const sections = ['Account', 'Features', 'ViVi', 'Integrations', 'Appearance', 'Billing', 'Export', 'Demo'];

export const SettingsSidebarNav = ({ active, setActive }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <ul>
        {sections.map(section => (
          <li key={section}>
            <button
              onClick={() => setActive(section)}
              className={`block w-full text-left py-2 px-3 rounded mb-1 ${
                active === section ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
