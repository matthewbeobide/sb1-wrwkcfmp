import { create } from 'zustand';
import { Message } from '../types';
import { supabase } from '../lib/supabase';

interface MessageState {
  messages: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
  addMessage: (channelId: string, content: string, threadId?: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  fetchMessages: (channelId: string, threadId?: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: {},
  loading: true,
  error: null,

  addMessage: async (channelId, content, threadId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            channel_id: channelId,
            content,
            thread_id: threadId,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const key = threadId || channelId;
      set((state) => ({
        messages: {
          ...state.messages,
          [key]: [...(state.messages[key] || []), data],
        },
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addReaction: async (messageId, emoji) => {
    try {
      const { data: message, error: fetchError } = await supabase
        .from('messages')
        .select('reactions')
        .eq('id', messageId)
        .single();

      if (fetchError) throw fetchError;

      const reactions = message.reactions || {};
      const users = reactions[emoji] || [];
      const userId = (await supabase.auth.getUser()).data.user?.id;

      if (!userId) throw new Error('User not authenticated');

      const updatedReactions = {
        ...reactions,
        [emoji]: users.includes(userId)
          ? users.filter((id: string) => id !== userId)
          : [...users, userId],
      };

      const { error: updateError } = await supabase
        .from('messages')
        .update({ reactions: updatedReactions })
        .eq('id', messageId);

      if (updateError) throw updateError;
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchMessages: async (channelId, threadId) => {
    try {
      const query = supabase
        .from('messages')
        .select(`
          *,
          users (
            id,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: true });

      if (threadId) {
        query.eq('thread_id', threadId);
      } else {
        query.eq('channel_id', channelId).is('thread_id', null);
      }

      const { data, error } = await query;

      if (error) throw error;

      const key = threadId || channelId;
      set((state) => ({
        messages: { ...state.messages, [key]: data },
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));