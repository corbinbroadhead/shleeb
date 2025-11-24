import { router } from "expo-router";
import { useRef, useState } from "react";
import { supabase } from "../utils/supabase";
import { useShleebChannel } from "./useShleebChannel";

export function usePlayerGame() {
  const channelRef = useShleebChannel();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const attachedRef = useRef(false);

  if (channelRef.current && !attachedRef.current) {
    attachedRef.current = true;

    channelRef.current.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("[player] Attaching START listener...");

        channelRef.current!.on(
          "broadcast",
          { event: "START" },
          (payload) => {
            console.log("[player] Event received!", payload);
            router.push("/player/game");
          }
        );
      }
    });
  }

  async function joinGame(playerName: string) {
    setLoading(true);

    const { data, error } = await supabase
      .from("players")
      .insert([{ name: playerName }])
      .select("id")
      .single();

    setLoading(false);

    if (error) return { success: false, error };

    setPlayerId(data.id);
    return { success: true, id: data.id };
  }

  function buzz() {
    if (!channelRef.current || !playerId) return;

    console.log("Sending BUZZ event");

    channelRef.current.send({
      type: "broadcast",
      event: "buzz",
      payload: { playerId, timestamp: Date.now() },
    });
  }

  return {
    loading,
    joinGame,
    buzz,
    playerId,
  };
}
