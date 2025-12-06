import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function usePlayersRealtime() {
  const [players, setPlayers] = useState([]);

  async function loadInitial() {
    const { data, error } = await supabase
      .from("players")
      .select("*");

      //console.log("Initial players data:", data);
      //console.log("First player structure:", data?.[0]);

    if (!error && data) setPlayers(data);
  }

  // Merge realtime events into state
  function applyDBChange(prev, payload) {
    const { eventType, new: newRow, old: oldRow } = payload;

    switch (eventType) {
      case "INSERT":
        return [...prev, newRow];

      case "UPDATE":
        return prev.map((p) =>
          p.id === newRow.id ? newRow : p
        );

      case "DELETE":
        return prev.filter((p) => p.id !== oldRow.id);

      default:
        return prev;
    }
  }

  useEffect(() => {
    loadInitial();

    const channel = supabase
      .channel("players-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        (payload) => {
          console.log("=== REALTIME EVENT ===");
          console.log("Event type:", payload.eventType);
          console.log("New row:", payload.new);
          console.log("Old row:", payload.old);
          setPlayers((prev) => {
            const updated = applyDBChange(prev, payload);
            console.log("Players after update:", updated);
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return players;
}
