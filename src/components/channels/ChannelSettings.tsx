import React from 'react';
import { Channel } from '../../types';
import { useChannelStore } from '../../store/channelStore';

interface ChannelSettingsProps {
  channel: Channel;
}

export const ChannelSettings = ({ channel }: ChannelSettingsProps) => {
  const updateChannel = useChannelStore((state) => state.updateChannel);
  const [name, setName] = React.useState(channel.name);
  const [description, setDescription] = React.useState(channel.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateChannel(channel.id, { name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Channel Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
          rows={3}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Privacy</label>
        <div className="text-sm text-gray-500">
          {channel.is_private
            ? 'This is a private channel. Only invited members can view and join this channel.'
            : 'This is a public channel. All workspace members can view and join this channel.'}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </form>
  );
};