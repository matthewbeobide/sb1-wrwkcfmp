import React from 'react';
import { Hash, Lock, Plus } from 'lucide-react';
import { useChannels } from '../../hooks/useChannels';
import { CreateChannelModal } from './CreateChannelModal';

export const ChannelList = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const { channels, loading } = useChannels();

  if (loading) {
    return <div className="p-4">Loading channels...</div>;
  }

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-300 mb-2">
          <span>Channels</span>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-1">
          {channels.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateChannelModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};