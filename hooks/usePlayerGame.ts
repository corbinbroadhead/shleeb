// usePlayerGame.ts
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Vibration } from 'react-native';
import { supabase } from "../utils/supabase";
import { useShleebChannel } from "./useShleebChannel";

export function usePlayerGame(initialPlayerId?: string | null, initialPlayerName?: string | null) {
  const channelRef = useShleebChannel();

  const [playerId, setPlayerId] = useState<string | null>(initialPlayerId || null);
  const playerIdRef = useRef<string | null>(null);

  const [storedPlayerName, setStoredPlayerName] = useState<string | null>(null);
  const storedPlayerNameRef = useRef<string | null>(null);

  const [game, setGame] = useState<"NEXT" | "EXPIRE" | "END" | "LOADING">("NEXT");
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  // ensure we only attach handlers once for the lifetime of the channel
  const attachedRef = useRef(false);

  // Debug logging of game changes
  useEffect(() => {
    console.log("[player] game UPDATED →", game);
  }, [game]);

  useEffect(()=> {
    playerIdRef.current = playerId;
  }, [playerId]);

  useEffect(()=> {
    storedPlayerNameRef.current = storedPlayerName;
  }, [storedPlayerName]);

  useEffect(() => {
    console.log("[player] useEffect RUNNING");
    const channel = channelRef.current;
    console.log("[player] channelRef.current =", !!channel ? channel.subTopic || channel.topic : channel);

    if (!channel) {
      console.log("[player] No channel available yet, returning.");
      return;
    }

    // helper that actually attaches the event handlers (idempotent via attachedRef)
    const attachHandlers = () => {
      if (attachedRef.current) {
        console.log("[player] Handlers already attached — skipping.");
        return;
      }
      attachedRef.current = true;

      console.log("[player] Attaching realtime handlers to channel (idempotent).");

      // START → navigate
      channel.on("broadcast", { event: "START" }, (payload) => {
        console.log("[player] START received → navigating");
        console.log("[player] playerId at navigation time:", playerId);
        setCurrentPrompt(payload.payload.prompt);
        try {
          router.push({
            pathname: "/player/game",
            params: { playerId: playerIdRef.current, playerName: storedPlayerNameRef.current, initialPrompt: payload.payload.prompt }
          });
        } catch (err) {
          console.warn("[player] router.push failed:", err);
        }
      });

      // NEXT → update state
      channel.on("broadcast", { event: "NEXT" }, (payload) => {
        console.log("[player] NEXT received");
        setCurrentPrompt(payload.payload.prompt)
        console.log("[player] Payload: ",payload);
        console.log("[player] Current prompt set to: ",currentPrompt);
        setGame("LOADING");
        setTimeout(() => setGame("NEXT"), 0);
        //setGame("NEXT");
      });

      // EXPIRE
      channel.on("broadcast", { event: "EXPIRE" }, () => {
        console.log("[player] EXPIRE received");
        setGame("EXPIRE");
      });

      // END
      channel.on("broadcast", { event: "END" }, () => {
        console.log("[player] END received");
        setGame("END");
      });

      // KICK
      channel.on("broadcast", { event: "KICK" }, async (payload) => {
        console.log("[player] KICK received, player: ",payload.payload.playerId);
          if (playerIdRef.current == payload.payload.playerId) {
          try {
            router.push({pathname:"/", params:{notice: "KICKED"}});
          } catch (err) {
            console.warn("[player] router.push failed:", err);
          }
        }
      })
    };

    // If channel is already subscribed/joined, attach immediately.
    // Supabase client may expose state or joinedOnce — check both.
    const isAlreadySubscribed =
      // prefer an explicit property if present
      // joinedOnce was present in your log; check it
      (channel as any).joinedOnce === true ||
      // some clients expose state
      (channel as any).state === "joined" ||
      (channel as any).state === "joined" ||
      // fallback: presence of a socket with readyState OPEN (1) may indicate connected
      ((channel as any).socket && (channel as any).socket.conn && (channel as any).socket.conn.readyState === 1);

    if (isAlreadySubscribed) {
      console.log("[player] Channel already subscribed/joined — attaching handlers immediately.");
      attachHandlers();
    } else {
      console.log("[player] Channel not yet subscribed — calling subscribe() and attaching handlers on SUBSCRIBED.");
    }

    // subscribe() returns a Push/Subscription-like object and calls its callback with status updates
    const subscription = channel.subscribe((status: string) => {
      console.log("[player] subscribe() STATUS:", status);
      if (status === "SUBSCRIBED" || status === "JOINED") {
        console.log("[player] subscribe() indicates SUBSCRIBED/JOINED — attaching handlers now.");
        attachHandlers();
      }
    });

    // Defensive: if subscribe already returned a truthy value and channel appears joined, attach
    // (This can catch race conditions where subscribe resolves synchronous before the callback was attached)
    try {
      if (!attachedRef.current) {
        // double-check again after calling subscribe
        const maybeJoined =
          (channel as any).joinedOnce === true ||
          (channel as any).state === "joined" ||
          ((channel as any).socket && (channel as any).socket.conn && (channel as any).socket.conn.readyState === 1);

        if (maybeJoined) {
          console.log("[player] After subscribe() call, channel seems joined — attaching handlers (race guard).");
          attachHandlers();
        }
      }
    } catch (e) {
      // swallow any property access errors
    }

    // Cleanup on unmount: unsubscribe from the channel and allow re-attach logic if remounted
    return () => {
      console.log("[player] CLEANUP: unsubscribing channel and resetting attachedRef");
      try {
        channel.unsubscribe();
      } catch (err) {
        console.warn("[player] channel.unsubscribe() threw:", err);
      }
      attachedRef.current = false;
    };
    // channelRef is stable (returned by useShleebChannel) so using it in deps is fine
  }, [channelRef]);

  // --- Join game ---
  async function joinGame(playerName: string) {
    const { data, error } = await supabase
      .from("players")
      .insert([{ name: playerName }])
      .select("id")
      .single();

    if (error) return { success: false, error };

    console.log("[player] Setting playerId to: ", data.id)
    console.log("[player] Setting playerName to:", playerName);
    setPlayerId(data.id);
    setStoredPlayerName(playerName);
    return { success: true, id: data.id };
  }

  function buzzerFeedback() {
    Vibration.vibrate([0, 200, 50, 200]);
  }

  // --- Buzz ---
  function buzz(id, playerName) {
    if (!channelRef.current || !id) return;
    console.log("[player] Sending BUZZ event");
    try {
      buzzerFeedback();
      channelRef.current.send({
        type: "broadcast",
        event: "buzz",
        payload: {
          id,
          playerName,
          timestamp: Date.now(),
        },
      });
    } catch (err) {
      console.warn("[player] failed to send buzz:", err);
    }
  }

  // --- Leave ---
  function leave() {
    if (!channelRef.current) return;
    const id = playerId;
    console.log("[player] Leaving game, player:",id);
    try {
      channelRef.current.send({
        type: "broadcast",
        event: "leave",
        payload: {id}
      })
    } catch (err) {
      console.warn("[player] Unable to leave:",err);
    }
  }

  return {
    joinGame,
    buzz,
    playerId,
    game,
    currentPrompt,
    leave
  };
}
