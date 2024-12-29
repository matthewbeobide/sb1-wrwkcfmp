import React from 'react';
import { Hash, Lock, Users, Info } from 'lucide-react';
import { Channel } from '../../types';
import { useChannelMembers } from '../../hooks/useChannelMembers';

interface ChannelHeaderProps {
  channel: Channel;
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  const { members, loading } = useChannelMembers(channel.id);

  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        {channel.is_private ? <Lock className="w-5 h-5" /> : <Hash className="w-5 h-5" />}
        <h2 className="font-semibold">{channel.name}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
          <Users className="w-4 h-4" />
          <span>{loading ? '...' : members.length}</span>
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};