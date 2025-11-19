import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useShleebChannel } from './useShleebChannel';

export function usePlayerGame() {
  const channelRef = useShleebChannel();

  const [playerId, setPlayerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function joinGame(playerName: string) {
    setLoading(true);

    const { data, error } = await supabase
      .from('players')
      .insert([{ name: playerName }])
      .select('id')
      .single();

    if (error) {
      console.error('Error joining game:', error);
      setLoading(false);
      return { success: false, error };
    }

    setPlayerId(data.id);
    setLoading(false);

    return { success: true, id: data.id };
  }

  function buzz() {
    if (!channelRef.current || !playerId) return;

    channelRef.current.send({
      type: 'broadcast',
      event: 'buzz',
      payload: {
        playerId,
        timestamp: Date.now(),
      },
    });
  }

  return {
    playerId,
    loading,
    buzz,
    joinGame,
  };
}
