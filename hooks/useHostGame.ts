import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useShleebChannel } from './useShleebChannel';

export function useHostGame() {
  const channelRef = useShleebChannel();
  const [players, setPlayers] = useState([]);
  const [buzzes, setBuzzes] = useState([]);

  // Listen for realtime buzzes
  useEffect(() => {
    const channel = channelRef.current;
    if (!channel) return;

    const subscription = channel.on(
      'broadcast',
      { event: 'buzz' },
      (payload) => {
        const { playerId, timestamp } = payload;
        setBuzzes((prev) => [...prev, { playerId, timestamp }]);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Listen for player table changes
  useEffect(() => {
    const playersChannel = supabase
      .channel('players-table')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players'
        },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    fetchPlayers();

    return () => {
      supabase.removeChannel(playersChannel);
    };
  }, []);

  async function fetchPlayers() {
    const { data } = await supabase
      .from('players')
      .select('*')
      .order('joined_at');

    setPlayers(data || []);
  }

  function resetBuzzes() {
    setBuzzes([]);
  }

  async function createSession() {
    // Clear players
    await supabase.from('players').delete().neq('id', '');

    // Clear buzzes
    await supabase.from('buzzes').delete().neq('id', '');

    return { started: true };
  }

  // -------------------------------------------------------
  // NEW: Generic function to broadcast events to the channel
  // -------------------------------------------------------
  async function sendBroadcast(eventName, payload = {}) {
    const channel = channelRef.current;
    if (!channel) {
      console.warn("sendBroadcast called but channelRef.current is null");
      return;
    }

    console.log("Sending event"+eventName)

    await channel.send({
      type: "broadcast",
      event: eventName,
      payload,
    });
  }

  return {
    players,
    buzzes,
    resetBuzzes,
    createSession,
    sendBroadcast,   // ← return it
  };
}
