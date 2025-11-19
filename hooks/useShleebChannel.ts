import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase';

export function useShleebChannel() {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const channel = supabase.channel('shleeb', {
      config: {
        broadcast: { self: true }
      }
    });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Connected to shleeb realtime channel');
      }
    });

    channelRef.current = channel;

    return () => {
      console.log('Unsubscribed from shleeb channel');
      supabase.removeChannel(channel);
    };
  }, []);

  return channelRef;
}
