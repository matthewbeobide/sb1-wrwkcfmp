import React from 'react';
import { X, UserPlus, Settings } from 'lucide-react';
import { Channel } from '../../types';
import { useChannelMembers } from '../../hooks/useChannelMembers';
import { MemberList } from './MemberList';
import { ChannelSettings } from './ChannelSettings';

interface ChannelDetailsProps {
  channel: Channel;
  onClose: () => void;
}

export const ChannelDetails = ({ channel, onClose }: ChannelDetailsProps) => {
  const [activeTab, setActiveTab] = React.useState<'about' | 'members' | 'settings'>('about');
  const { members } = useChannelMembers(channel.id);

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl border-l">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium">Channel Details</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b">
          {['about', 'members', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 p-2 text-sm ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm text-gray-600">{channel.description || 'No description'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Created</h4>
                <p className="text-sm text-gray-600">
                  {new Date(channel.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{members.length} members</span>
                <button className="text-indigo-600 hover:text-indigo-700">
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>
              <MemberList members={members} />
            </div>
          )}

          {activeTab === 'settings' && <ChannelSettings channel={channel} />}
        </div>
      </div>
    </div>
  );
};