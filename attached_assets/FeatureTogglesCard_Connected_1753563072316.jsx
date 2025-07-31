import React from 'react';
import { useSettings } from './settingsContext';

export const FeatureTogglesCard = () => {
  const { features, setFeatures } = useSettings();

  const toggleSwitch = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Feature Toggles</h2>
      {Object.keys(features).map((key) => (
        <div key={key} className="flex justify-between items-center mb-2">
          <span>{key}</span>
          <button onClick={() => toggleSwitch(key)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            {features[key] ? 'ON' : 'OFF'}
          </button>
        </div>
      ))}
    </div>
  );
};
