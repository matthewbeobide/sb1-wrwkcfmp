import React from 'react';
import { format } from 'date-fns';
import { Smile, MessageSquare, MoreVertical } from 'lucide-react';
import { Message as MessageType } from '../../types';
import { ReactionPicker } from './ReactionPicker';
import { MessageThread } from './MessageThread';
import { useAuthStore } from '../../store/authStore';

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const [showReactions, setShowReactions] = React.useState(false);
  const [showThread, setShowThread] = React.useState(false);
  const user = useAuthStore((state) => state.user);

  const isOwnMessage = message.user_id === user?.id;
  const formattedDate = format(new Date(message.created_at), 'h:mm a');

  const renderContent = () => {
    const parts = message.content.split(/([@#]\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return <span key={index} className="text-blue-500 hover:underline">{part}</span>;
      }
      if (part.startsWith('#')) {
        return <span key={index} className="text-indigo-500 hover:underline">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="group relative flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg">
      <div className="w-8 h-8 rounded-sm bg-indigo-500 flex items-center justify-center text-white">
        {message.users?.full_name?.[0] || '?'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <span className="font-medium">{message.users?.full_name}</span>
          <span className="ml-2 text-xs text-gray-500">{formattedDate}</span>
        </div>

        <p className="text-gray-900 mt-1">{renderContent()}</p>

        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <button
                key={emoji}
                className="inline-flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded px-2 py-0.5 text-sm"
              >
                <span>{emoji}</span>
                <span>{users.length}</span>
              </button>
            ))}
          </div>
        )}

        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center space-x-2">
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Smile className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowThread(!showThread)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {showReactions && (
          <ReactionPicker
            messageId={message.id}
            onClose={() => setShowReactions(false)}
          />
        )}

        {showThread && (
          <MessageThread
            messageId={message.id}
            onClose={() => setShowThread(false)}
          />
        )}
      </div>
    </div>
  );
};