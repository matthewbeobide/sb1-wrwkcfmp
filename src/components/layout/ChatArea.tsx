import React from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

export const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

const ChatHeader = () => {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-4">
      <h2 className="font-semibold"># general</h2>
    </div>
  );
};

const MessageList = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Message 
        user="John Doe"
        content="Hey team! How's everyone doing today?"
        timestamp="12:30 PM"
      />
      <Message 
        user="Jane Smith"
        content="Going great! Working on the new feature."
        timestamp="12:32 PM"
      />
    </div>
  );
};

const Message = ({ user, content, timestamp }: { 
  user: string; 
  content: string; 
  timestamp: string;
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 rounded-sm bg-blue-500 flex items-center justify-center text-white">
        {user[0]}
      </div>
      <div>
        <div className="flex items-baseline space-x-2">
          <span className="font-medium">{user}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className="text-gray-900">{content}</p>
      </div>
    </div>
  );
};

const MessageInput = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md p-2">
        <button className="text-gray-500 hover:text-gray-700">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Message #general"
          className="flex-1 outline-none"
        />
        <button className="text-gray-500 hover:text-gray-700">
          <Smile className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};