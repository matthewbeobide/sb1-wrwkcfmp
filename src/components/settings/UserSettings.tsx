import React from 'react';
import { Settings, Bell, Palette, Lock, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NotificationSettings } from './NotificationSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { PrivacySettings } from './PrivacySettings';
import { MessageRetentionSettings } from './MessageRetentionSettings';

export const UserSettings = () => {
  const [activeTab, setActiveTab] = React.useState('notifications');
  const user = useAuthStore((state) => state.user);

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'retention', label: 'Message Retention', icon: Clock },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] h-[600px] flex">
        <div className="w-64 border-r border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'retention' && <MessageRetentionSettings />}
        </div>
      </div>
    </div>
  );
};