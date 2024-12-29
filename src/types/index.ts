export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  last_seen?: string;
  status?: 'online' | 'away' | 'offline';
  theme_preference?: 'light' | 'dark';
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  is_private: boolean;
  workspace_id: string;
  created_at: string;
  created_by: string;
}

export interface Message {
  id: string;
  content: string;
  channel_id: string;
  user_id: string;
  created_at: string;
  updated_at?: string;
  is_ephemeral: boolean;
  expires_at?: string;
  mentions?: string[];
  reactions?: Record<string, string[]>;
  thread_id?: string;
  parent_id?: string;
}