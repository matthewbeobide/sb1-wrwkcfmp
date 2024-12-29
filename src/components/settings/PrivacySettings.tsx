import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export const PrivacySettings = () => {
  const { privacy, updatePrivacy } = useSettingsStore();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Privacy Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Online Status</label>
            <p className="text-sm text-gray-500">Show when you're active</p>
          </div>
          <input
            type="checkbox"
            checked={privacy.showOnlineStatus}
            onChange={(e) => updatePrivacy({ showOnlineStatus: e.target.checked })}
            className="h-4 w-4 text-indigo-600 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Read Receipts</label>
            <p className="text-sm text-gray-500">Show when you've read messages</p>
          </div>
          <input
            type="checkbox"
            checked={privacy.readReceipts}
            onChange={(e) => updatePrivacy({ readReceipts: e.target.checked })}
            className="h-4 w-4 text-indigo-600 rounded"
          />
        </div>
      </div>
    </div>
  );
};