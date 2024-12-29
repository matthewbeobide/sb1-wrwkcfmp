import React from 'react';
import { MoreVertical } from 'lucide-react';
import { User } from '../../types';

interface MemberListProps {
  members: User[];
}

export const MemberList = ({ members }: MemberListProps) => {
  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-sm bg-indigo-500 flex items-center justify-center text-white">
              {member.full_name[0]}
            </div>
            <div>
              <div className="font-medium">{member.full_name}</div>
              <div className="text-sm text-gray-500">{member.email}</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};