import { useEffect } from 'react';
import { useChannelStore } from '../store/channelStore';

export const useChannels = () => {
  const { channels, loading, error, fetchChannels } = useChannelStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return { channels, loading, error };
};