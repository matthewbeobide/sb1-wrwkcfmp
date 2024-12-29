import React from 'react';
import { Hash, Lock, ChevronDown, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-64 bg-[#19171D] text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">Workspace Name</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center mt-2 text-gray-300">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          {user?.full_name}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer mb-2">
            <span>Channels</span>
            <Plus className="w-4 h-4" />
          </div>
          
          <ChannelList />
        </div>
      </div>
    </div>
  );
};

const ChannelList = () => {
  return (
    <div className="space-y-1">
      <ChannelItem name="general" isPrivate={false} />
      <ChannelItem name="random" isPrivate={false} />
      <ChannelItem name="team-private" isPrivate={true} />
    </div>
  );
};

const ChannelItem = ({ name, isPrivate }: { name: string; isPrivate: boolean }) => {
  return (
    <div className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
      {isPrivate ? <Lock className="w-4 h-4 mr-2" /> : <Hash className="w-4 h-4 mr-2" />}
      {name}
    </div>
  );
};