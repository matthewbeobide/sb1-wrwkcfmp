import React from 'react';
import { X } from 'lucide-react';
import { useChannelStore } from '../../store/channelStore';

interface CreateChannelModalProps {
  onClose: () => void;
}

export const CreateChannelModal = ({ onClose }: CreateChannelModalProps) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);
  const createChannel = useChannelStore((state) => state.createChannel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createChannel({ name, description, is_private: isPrivate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Create a channel</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Channel name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-md"
              placeholder="e.g. project-updates"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-md"
              placeholder="What's this channel about?"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="private" className="font-medium">
              Make private
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};