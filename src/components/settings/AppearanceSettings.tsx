import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export const AppearanceSettings = () => {
  const { theme, updateTheme } = useSettingsStore();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Appearance</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => updateTheme(e.target.value as 'light' | 'dark')}
            className="w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Font Size</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
};