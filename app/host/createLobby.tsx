import DestructiveButton from "@/components/DestructiveButton";
import StandardButton from "@/components/StandardButton";
import { useHostGame } from "@/hooks/useHostGame";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native";

export default function CreateLobby() {
  const { createSession, players } = useHostGame();

  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // guard to ensure we only auto-start once per mount (protects against HMR double-run)
  const startedRef = useRef(false);

  async function initSession() {
    // guard (extra protection)
    if (startedRef.current) return;
    startedRef.current = true;

    setError(null);
    setLoading(true);

    try {
      await createSession();
      setSessionReady(true);
    } catch (err: any) {
      console.error("Error creating session:", err);
      setError(err?.message || "Failed to create session");
      setSessionReady(false);
    } finally {
      setLoading(false);
    }
  }

  // auto-run once when this screen mounts
  useEffect(() => {
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty: run once on mount

  // BEFORE session is ready: show loading state (auto-starting)
  if (!sessionReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        {loading ? (
          <>
            <View style={{width: "100%", height:"100%", alignContent: "flex-start"}}>
              <ActivityIndicator size="large" />
            </View>
          </>
        ) : error ? (
          <>
            <Text style={{ fontSize: 20, color: "red", marginBottom: 12 }}>
              {error}
            </Text>
            <Button title="Retry" onPress={initSession} />
            <View style={{ height: 12 }} />
            <Button title="Close" onPress={() => router.back()} />
          </>
        ) : (
          // If not loading and no error (rare), show a fallback button to start manually
          <>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Create Lobby</Text>
            <Button title="Start New Lobby" onPress={initSession} />
          </>
        )}
      </View>
    );
  }

  // AFTER sessionReady === true: show lobby active UI (same route)
  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Lobby Active</Text>
        <Text style={{ marginBottom: 20 }}>Waiting for players...</Text>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Players: {players.length}
        </Text>

        {players.map((p: any) => (
            <Text key={p.id} style={{ marginVertical: 4 }}>
            • {p.name || p.id}
            </Text>
        ))}

      </View>
      <View style={{width: "100%", alignItems: "center", marginBottom: 20}}>
        <StandardButton
            onClick={() => { /* your Start Game handler */ }}
            text="Start Game"
        />
        <DestructiveButton
            text="Close Lobby"
            onClick={async () => {
            try {
                if (players.length === 0) {
                router.back();
                return;
                }

                const ids = players.map((p: any) => p.id);
                const { data, error } = await supabase
                .from("players")
                .delete()
                .in("id", ids);

                console.log({ data, error });
                router.back();
            } catch (exceptionVar) {
                console.log(exceptionVar);
            }
            }}
        />
      </View>
    </ScrollView>
  );
}
