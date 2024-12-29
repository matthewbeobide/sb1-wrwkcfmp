import React from 'react';
import { useMessages } from '../../hooks/useMessages';
import { Message } from './Message';
import { useChannelStore } from '../../store/channelStore';

export const MessageList = () => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const activeChannel = useChannelStore((state) => state.activeChannel);
  const { messages, loading } = useMessages(activeChannel?.id || '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!activeChannel) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a channel to start messaging
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};