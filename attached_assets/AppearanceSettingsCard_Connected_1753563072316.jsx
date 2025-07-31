import React from 'react';
import { useSettings } from './settingsContext';

const themes = ['Night Mode', 'Sunset Gold', 'Mint Fresh', 'Sierra Canyon', 'Sky Burst', 'Onyx Blackout', 'Elegant Rose', 'Soft Mode'];

export const AppearanceSettingsCard = () => {
  const { themeChoice, setThemeChoice } = useSettings();

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Theme Appearance</h2>
      <select value={themeChoice} onChange={(e) => setThemeChoice(e.target.value)} className="w-full p-2 rounded border">
        {themes.map(theme => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>
      <p className="mt-2">Selected Theme: {themeChoice}</p>
    </div>
  );
};
