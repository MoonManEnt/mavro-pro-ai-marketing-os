import React from 'react';
import { Palette, Monitor, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const themes = [
  { value: 'executive', label: 'Executive Command', description: 'Clean, professional with purple accents' },
  { value: 'night', label: 'Night Mode', description: 'Dark theme for low-light environments' },
  { value: 'sunset', label: 'Sunset Gold', description: 'Warm purple and gold gradients' },
  { value: 'mint', label: 'Mint Fresh', description: 'Clean white with green accents' },
  { value: 'canyon', label: 'Sierra Canyon', description: 'Orange and purple desert tones' },
  { value: 'sky', label: 'Sky Burst', description: 'Blue gradients with cloud whites' },
  { value: 'onyx', label: 'Onyx Blackout', description: 'Pure black with white text' },
  { value: 'rose', label: 'Elegant Rose', description: 'Soft pink with elegant grays' }
];

export const AppearanceSettingsCard = () => {
  const { themeChoice, setThemeChoice } = useSettings();

  return (
    <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-purple-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900">Theme Appearance</span>
        </CardTitle>
        <CardDescription>Customize your visual experience with premium themes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-900">Select Theme</label>
          <Select value={themeChoice} onValueChange={setThemeChoice}>
            <SelectTrigger className="rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors duration-200">
              <SelectValue placeholder="Choose a theme" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-gray-200 shadow-xl">
              {themes.map(theme => (
                <SelectItem 
                  key={theme.value} 
                  value={theme.value}
                  className="rounded-lg hover:bg-purple-50 cursor-pointer"
                >
                  <div>
                    <div className="font-medium">{theme.label}</div>
                    <div className="text-xs text-gray-500">{theme.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Current Selection</span>
            <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600">
            {themes.find(t => t.value === themeChoice)?.label || 'Executive Command'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {themes.find(t => t.value === themeChoice)?.description || 'Clean, professional with purple accents'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex flex-col items-center p-4 h-auto"
          >
            <Sun className="w-5 h-5 text-yellow-600 mb-1" />
            <span className="text-xs font-medium">Light Mode</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex flex-col items-center p-4 h-auto"
          >
            <Moon className="w-5 h-5 text-indigo-600 mb-1" />
            <span className="text-xs font-medium">Dark Mode</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex flex-col items-center p-4 h-auto"
          >
            <Monitor className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium">Auto</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};