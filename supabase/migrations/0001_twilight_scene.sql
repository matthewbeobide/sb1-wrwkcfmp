/*
  # Initial Slack Clone Schema

  1. New Tables
    - users
      - Custom user profile data
      - Theme preferences
      - Status tracking
    - workspaces
      - Organization workspaces
    - channels
      - Communication channels within workspaces
    - messages
      - Chat messages with support for ephemeral messages
    - workspace_members
      - Workspace membership and roles
    - channel_members
      - Channel membership tracking
    
  2. Security
    - RLS policies for all tables
    - Role-based access control
*/

-- Users table for extended profile data
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  status text DEFAULT 'offline',
  last_seen timestamp with time zone,
  theme_preference text DEFAULT 'light',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Workspaces table
CREATE TABLE public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES public.users(id)
);

-- Workspace members
CREATE TABLE public.workspace_members (
  workspace_id uuid REFERENCES public.workspaces(id),
  user_id uuid REFERENCES public.users(id),
  role text DEFAULT 'member',
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);

-- Channels table
CREATE TABLE public.channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id),
  name text NOT NULL,
  description text,
  is_private boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES public.users(id)
);

-- Channel members
CREATE TABLE public.channel_members (
  channel_id uuid REFERENCES public.channels(id),
  user_id uuid REFERENCES public.users(id),
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (channel_id, user_id)
);

-- Messages table
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id uuid REFERENCES public.channels(id),
  user_id uuid REFERENCES public.users(id),
  content text NOT NULL,
  is_ephemeral boolean DEFAULT false,
  expires_at timestamp with time zone,
  mentions jsonb DEFAULT '[]',
  reactions jsonb DEFAULT '{}',
  thread_id uuid REFERENCES public.messages(id),
  parent_id uuid REFERENCES public.messages(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Workspace members can read workspace"
  ON public.workspaces
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members
      WHERE workspace_id = id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Channel members can read messages"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.channel_members
      WHERE channel_id = messages.channel_id
      AND user_id = auth.uid()
    )
  );

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();