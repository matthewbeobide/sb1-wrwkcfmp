import React from 'react';
import { Hash, Lock, MoreVertical } from 'lucide-react';
import { Channel } from '../../types';
import { useChannelStore } from '../../store/channelStore';

interface ChannelItemProps {
  channel: Channel;
}

export const ChannelItem = ({ channel }: ChannelItemProps) => {
  const setActiveChannel = useChannelStore((state) => state.setActiveChannel);
  const activeChannel = useChannelStore((state) => state.activeChannel);

  return (
    <div 
      className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
        activeChannel?.id === channel.id 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={() => setActiveChannel(channel)}
    >
      <div className="flex items-center space-x-2">
        {channel.is_private ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Hash className="w-4 h-4" />
        )}
        <span>{channel.name}</span>
      </div>
      
      <button className="opacity-0 group-hover:opacity-100">
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
};