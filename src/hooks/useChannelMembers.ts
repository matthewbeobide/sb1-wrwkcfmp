import { useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

export const useChannelMembers = (channelId: string) => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('channel_members')
          .select(`
            users (
              id,
              full_name,
              email,
              avatar_url,
              status
            )
          `)
          .eq('channel_id', channelId);

        if (error) throw error;
        setMembers(data.map((item) => item.users));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [channelId]);

  return { members, loading, error };
};