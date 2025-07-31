import { createContext, useContext, useState } from 'react';
import toggles from './featureToggles.json';
import theme from './uiTheme.json';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [features, setFeatures] = useState(toggles);
  const [themeChoice, setThemeChoice] = useState(theme.selectedTheme);

  return (
    <SettingsContext.Provider value={{ features, setFeatures, themeChoice, setThemeChoice }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
