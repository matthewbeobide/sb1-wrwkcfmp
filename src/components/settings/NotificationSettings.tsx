import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export const NotificationSettings = () => {
  const { notifications, updateNotifications } = useSettingsStore();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Desktop Notifications</label>
            <p className="text-sm text-gray-500">Get notified about new messages</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.desktop}
            onChange={(e) => updateNotifications({ desktop: e.target.checked })}
            className="h-4 w-4 text-indigo-600 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Sound</label>
            <p className="text-sm text-gray-500">Play a sound for new messages</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.sound}
            onChange={(e) => updateNotifications({ sound: e.target.checked })}
            className="h-4 w-4 text-indigo-600 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Email Notifications</label>
            <p className="text-sm text-gray-500">Get important updates via email</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={(e) => updateNotifications({ email: e.target.checked })}
            className="h-4 w-4 text-indigo-600 rounded"
          />
        </div>
      </div>
    </div>
  );
};