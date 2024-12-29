import React from 'react';
import { X } from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';
import { Message } from './Message';
import { MessageInput } from './MessageInput';

interface MessageThreadProps {
  messageId: string;
  onClose: () => void;
}

export const MessageThread = ({ messageId, onClose }: MessageThreadProps) => {
  const { messages, loading } = useMessages('', messageId);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium">Thread</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div>Loading thread...</div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <MessageInput threadId={messageId} />
        </div>
      </div>
    </div>
  );
};