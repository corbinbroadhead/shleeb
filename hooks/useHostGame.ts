import { useBuzzer } from '@/contexts/buzzerContext';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useShleebChannel } from './useShleebChannel';

export function useHostGame() {
  const channelRef = useShleebChannel();
  const [players, setPlayers] = useState([]);
  const [buzzes, setBuzzes] = useState([]);
  const { buzzEnabled } = useBuzzer();

  function buzzerFeedback() {
    if(buzzEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }
  // -------------------------------------------------------------
  // Listen for realtime buzzes from players
  // -------------------------------------------------------------
  useEffect(() => {
    const channel = channelRef.current;
    if (!channel) return;

    console.log("[host] Attaching BUZZ listener");

    // In Supabase 2.x, channel.on() returns the channel,
    // so we must track the handler function ourselves.
    const handler = (event) => {
      const { id, playerName, timestamp } = event.payload;
      const playerId = id;
      console.log("[host] BUZZ RECEIVED:", playerId, playerName, timestamp);

      setBuzzes((prev) => {
        // Ignore duplicate buzzes from the same player
        if (prev.some(b => b.playerId === playerId)) {
          console.log("[host] Player already buzzed, ignoring: ", playerId);
          return prev;
        }

        // Only trigger feedback for the very first buzz
        if (prev.length === 0) {
          buzzerFeedback();
        }

        // Return the updated buzz array sorted by timestamp
        return [...prev, { playerId, playerName, timestamp }].sort(
          (a, b) => a.timestamp - b.timestamp
        );
      });
    };

    channel.on("broadcast", { event: "KICK" }, async (event) => {
      const { playerId } = event.payload;
      console.log("[host] KICK received for playerId:", playerId);
      
      try {
        // Remove from database
        const { error } = await supabase
          .from("players")
          .delete()
          .eq("id", playerId);
        
        if (error) {
          console.error("[host] Error removing player from database:", error);
          return;
        }
        console.log("[host] Player removed:", playerId);
      } catch (err) {
        console.error("[host] Exception during KICK handling:", err);
      }
    });

    channel.on("broadcast", { event: "leave" }, async (event) => {
      const { id } = event.payload;
      console.log("[host] LEAVE received for playerId:",id);

      try {
        // Remove from database
        const { error } = await supabase
          .from("players")
          .delete()
          .eq("id", id);
        
        if (error) {
          console.error("[host] Error removing player from database:", error);
          return;
        }
        console.log("[host] Player removed:", id);
      } catch (err) {
        console.error("[host] Exception during LEAVE handling:", err);
      }
    })

    channel.on("broadcast", { event: "buzz" }, handler);
    console.log("Buzzes: ",buzzes);
    return () => {
      console.log("[host] Removing BUZZ listener");
      try {
        channel.off("broadcast", handler);
      } catch (err) {
        console.warn("[host] channel.off failed:", err);
      }
    };
  }, [channelRef]);

  // -------------------------------------------------------------
  // Listen for player table updates (score changes, joins, etc.)
  // -------------------------------------------------------------
  useEffect(() => {
    const playersChannel = supabase
      .channel("players-table")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
        },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    // Initial load
    fetchPlayers();

    return () => {
      console.log("[host] Removing players-table channel");
      supabase.removeChannel(playersChannel);
    };
  }, []);

  // Fetch all players
  async function fetchPlayers() {
    const { data } = await supabase
      .from("players")
      .select("*")
      .order("joined_at");

    setPlayers(data || []);
  }

  // Reset buzz order
  function clearBuzzes() {
    setBuzzes([]);
  }

  // Reset everything
  async function createSession() {
    await supabase.from("players").delete().neq("id", "");
    await supabase.from("buzzes").delete().neq("id", "");

    return { started: true };
  }

  // Generic broadcaster for START / NEXT / EXPIRE / END
  async function sendBroadcast(eventName, payload = {}) {
    const channel = channelRef.current;
    if (!channel) {
      console.warn("sendBroadcast called but channelRef.current is null");
      return;
    }

    console.log("[host] Sending event:", eventName);

    await channel.send({
      type: "broadcast",
      event: eventName,
      payload,
    });
  }

  return {
    players,
    buzzes,
    clearBuzzes,
    createSession,
    sendBroadcast,
  };
}
