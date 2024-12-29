import React from 'react';
import { Shield } from 'lucide-react';

export const MessageRetentionSettings = () => {
  const [retentionPeriod, setRetentionPeriod] = React.useState('forever');
  const [ephemeralEnabled, setEphemeralEnabled] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Message Retention</h3>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-sm text-yellow-700">
          These settings can only be modified by workspace administrators.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Retention Period</label>
          <select
            value={retentionPeriod}
            onChange={(e) => setRetentionPeriod(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm"
            disabled
          >
            <option value="forever">Keep Forever</option>
            <option value="90">90 days</option>
            <option value="30">30 days</option>
            <option value="7">7 days</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Ephemeral Messages</label>
            <p className="text-sm text-gray-500">
              Enable Snapchat-like disappearing messages
            </p>
          </div>
          <input
            type="checkbox"
            checked={ephemeralEnabled}
            onChange={(e) => setEphemeralEnabled(e.target.checked)}
            className="h-4 w-4 text-indigo-600 rounded"
            disabled
          />
        </div>
      </div>
    </div>
  );
};