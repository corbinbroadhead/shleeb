import DestructiveButton from "@/components/DestructiveButton";
import HeaderText from "@/components/HeaderText";
import PlayerListItem from "@/components/PlayerListItem";
import PromptSetPicker from "@/components/PromptSetPicker";
import StandardButton from "@/components/StandardButton";
import { PromptSet } from "@/data/promptSets";
import { useHostGame } from "@/hooks/useHostGame";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, ScrollView, Text, View } from "react-native";

export default function CreateLobby() {
  const { createSession, players, sendBroadcast } = useHostGame();

  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPromptSet, setSelectedPromptSet] = useState<PromptSet | null>(null);

  const startedRef = useRef(false);

  async function handleStartGame() {
    // Validate prompt set is selected
    if (!selectedPromptSet) {
      Alert.alert("Select Prompt Set", "Please select a prompt set before starting the game.");
      return;
    }

    // Notify all players
    await sendBroadcast("START", { time: Date.now(), prompt: selectedPromptSet.prompts[0] });

    // Move host to game screen with prompt set ID
    router.push({
      pathname: '/host/game',
      params: { promptSetId: selectedPromptSet.id }
    });
  }

  async function handleKickPlayer(playerId: string) {
    await sendBroadcast("KICK", {playerId: playerId});
    return;
  }

  async function initSession() {
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

  useEffect(() => {
    initSession();
  }, []);

  // Loading/error states (same as before)
  if (!sessionReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, paddingTop: 70 }}>
        {loading ? (
          <>
            <View style={{width: "100%", height:"100%", alignContent: "flex-start"}}>
              <ActivityIndicator size="large" />
            </View>
          </>
        ) : error ? (
          <>
            <Text style={{ fontSize: 20, color: "#DC2626", marginBottom: 12 }}>
              {error}
            </Text>
            <Button title="Retry" onPress={initSession} />
            <View style={{ height: 12 }} />
            <Button title="Close" onPress={() => router.back()} />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Create Lobby</Text>
            <Button title="Start New Lobby" onPress={initSession} />
          </>
        )}
      </View>
    );
  }

  // Lobby active UI
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 50, backgroundColor: "#7C3AED" }} />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
        }}
      >
        <HeaderText style={{ fontSize: 22, color: "#7C3AED", marginBottom: 8}}>Lobby Active</HeaderText>
        <Text style={{ marginBottom: 20 }}>Waiting for players...</Text>

        {/* Prompt Set Picker */}
        <PromptSetPicker
          selectedSet={selectedPromptSet}
          onSelectSet={setSelectedPromptSet}
        />

        <HeaderText style={{ fontSize: 18, marginBottom: 10, marginTop: 20 }}>
          Players: {players.length}
        </HeaderText>

        {players.map((p: any) => (
          <PlayerListItem key={p.id} player={p} onKick={handleKickPlayer} />
        ))}
      </ScrollView>

      {/* Bottom buttons */}
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <StandardButton onClick={handleStartGame} text="Start Game" />
        <DestructiveButton
          text="Close Lobby"
          onClick={async () => {
            try {
              if (players.length === 0) {
                router.back();
                return;
              }

              const ids = players.map((p: any) => p.id);
              await supabase.from("players").delete().in("id", ids);
              router.back();
            } catch (exceptionVar) {
              console.log(exceptionVar);
            }
          }}
        />
      </View>
    </View>
  );

}