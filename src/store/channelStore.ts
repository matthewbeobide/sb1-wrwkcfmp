import { create } from 'zustand';
import { Channel } from '../types';
import { supabase } from '../lib/supabase';

interface ChannelState {
  channels: Channel[];
  activeChannel: Channel | null;
  loading: boolean;
  error: string | null;
  setChannels: (channels: Channel[]) => void;
  setActiveChannel: (channel: Channel) => void;
  createChannel: (channel: Partial<Channel>) => Promise<void>;
  updateChannel: (id: string, updates: Partial<Channel>) => Promise<void>;
  addMember: (channelId: string, userId: string) => Promise<void>;
  removeMember: (channelId: string, userId: string) => Promise<void>;
  fetchChannels: () => Promise<void>;
}

export const useChannelStore = create<ChannelState>((set, get) => ({
  channels: [],
  activeChannel: null,
  loading: true,
  error: null,
  
  setChannels: (channels) => set({ channels }),
  setActiveChannel: (channel) => set({ activeChannel: channel }),
  
  createChannel: async (channel) => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .insert([channel])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        channels: [...state.channels, data],
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateChannel: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        channels: state.channels.map((ch) => (ch.id === id ? data : ch)),
        activeChannel: state.activeChannel?.id === id ? data : state.activeChannel,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addMember: async (channelId, userId) => {
    try {
      const { error } = await supabase
        .from('channel_members')
        .insert([{ channel_id: channelId, user_id: userId }]);

      if (error) throw error;
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  removeMember: async (channelId, userId) => {
    try {
      const { error } = await supabase
        .from('channel_members')
        .delete()
        .eq('channel_id', channelId)
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchChannels: async () => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      set({ channels: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));