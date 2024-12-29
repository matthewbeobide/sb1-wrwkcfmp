import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatArea } from '../components/layout/ChatArea';

const Workspace = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default Workspace;