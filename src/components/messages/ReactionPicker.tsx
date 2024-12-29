import React from 'react';
import { useMessageStore } from '../../store/messageStore';

const EMOJI_LIST = ['👍', '❤️', '😂', '🎉', '🤔', '👀', '🚀', '👏'];

interface ReactionPickerProps {
  messageId: string;
  onClose: () => void;
}

export const ReactionPicker = ({ messageId, onClose }: ReactionPickerProps) => {
  const addReaction = useMessageStore((state) => state.addReaction);

  const handleReaction = async (emoji: string) => {
    await addReaction(messageId, emoji);
    onClose();
  };

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-lg border p-2">
      <div className="flex space-x-2">
        {EMOJI_LIST.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className="hover:bg-gray-100 p-1 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};