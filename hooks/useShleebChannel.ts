import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { supabase } from "../utils/supabase";

export function useShleebChannel() {
  const channelRef = useRef<RealtimeChannel | null>(null);

  if (!channelRef.current) {
    channelRef.current = supabase.channel("shleeb", {
      config: { broadcast: { ack: true, self: true } },
    });
  }

  useEffect(() => {
    const channel = channelRef.current!;
    channel.subscribe((status) => {
      console.log("[shleeb] subscribe status:", status);
      if (status === "SUBSCRIBED") console.log("[shleeb] Connected to shleeb realtime channel");
    });

    return () => supabase.removeChannel(channel);
  }, []);

  return channelRef;
}
