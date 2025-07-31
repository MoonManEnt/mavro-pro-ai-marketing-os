import React, { useEffect } from 'react';
import { useSettings } from './settingsContext';

const themeMap = {
  "Night Mode": "bg-gray-900 text-white",
  "Sunset Gold": "bg-purple-900 text-yellow-300",
  "Mint Fresh": "bg-white text-green-600",
  "Sierra Canyon": "bg-orange-50 text-purple-900",
  "Sky Burst": "bg-blue-100 text-blue-800",
  "Onyx Blackout": "bg-black text-white",
  "Elegant Rose": "bg-pink-100 text-gray-900",
  "Soft Mode": "bg-gray-100 text-gray-800"
};

export const ThemeWrapper = ({ children }) => {
  const { themeChoice } = useSettings();

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(...themeMap[themeChoice].split(' '));
  }, [themeChoice]);

  return children;
};
