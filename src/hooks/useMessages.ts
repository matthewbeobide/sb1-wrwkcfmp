import { useEffect, useState } from 'react';
import { Message } from '../types';
import { supabase } from '../lib/supabase';

export const useMessages = (channelId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            users (
              id,
              full_name,
              avatar_url
            )
          `)
          .eq('channel_id', channelId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`messages:${channelId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'messages',
        filter: `channel_id=eq.${channelId}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [channelId]);

  const sendMessage = async (content: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            channel_id: channelId,
            content,
          }
        ]);

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { messages, loading, error, sendMessage };
};