import { useHostGame } from "@/hooks/useHostGame";
import useNextWait from "@/hooks/useNextWait";
import { router } from "expo-router";
import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function HostGame() {
  const { sendBroadcast } = useHostGame();

  // Host either sees the prompt screen or the leaderboard
  const [gameState, setGameState] = useState("ACTIVE");

  // You will fill this in later with your prompt system
  const [prompt, setPrompt] = useState(null);

  // Hook controlling the 3-second wait when NEXT is triggered
  const { waiting, ready } = useNextWait(gameState);

  // ------------------------
  // BUTTON HANDLERS
  // ------------------------

  async function handleNext() {
    // Load next prompt here
    // e.g. setPrompt(nextPrompt)
    // -------------------------
    //   YOUR PROMPT LOADING
    //   goes here
    // -------------------------

    await sendBroadcast("NEXT", { time: Date.now() });

    // Restart the 3-second wait
    setGameState("ACTIVE");
  }

  async function handleDisable() {
    await sendBroadcast("EXPIRE", { time: Date.now() });
    // IMPORTANT: this does NOT change the host UI state.
    // Players' buzzers are disabled, but host remains ACTIVE.
  }

  async function handleEnd() {
    await sendBroadcast("END", { time: Date.now() });
    setGameState("END");
    router.push("/host/leaderboard");
  }

  // ------------------------
  // RENDER SECTIONS
  // ------------------------

  function renderPromptArea() {
    if (gameState === "END") {
      return (
        <View style={{ marginTop: 30 }}>
          {/* Your leaderboard component */}
          <Text style={{ fontSize: 24 }}>[Leaderboard goes here]</Text>
        </View>
      );
    }

    if (waiting) {
      return (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 28 }}>Next prompt incoming...</Text>
        </View>
      );
    }

    return (
      <View style={{ marginTop: 20 }}>
        {/* Your prompt display goes here */}
        <Text style={{ fontSize: 24 }}>
          {prompt ?? "[Prompt goes here]"}
        </Text>
      </View>
    );
  }

  function renderBuzzList() {
    if (gameState === "END") return null;

    return (
      <View style={{ marginTop: 25 }}>
        {/* Your buzz list component */}
        <Text style={{ fontSize: 20 }}>[Buzzed players go here]</Text>
      </View>
    );
  }

  // ------------------------
  // MAIN COMPONENT RENDER
  // ------------------------

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 50, backgroundColor: "purple" }} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          justifyContent: "flex-start",
        }}
      >
        {/* Prompt / Leaderboard */}
        {renderPromptArea()}

        {/* Buzz List */}
        {renderBuzzList()}

        {/* CONTROL BUTTONS */}
        {gameState === "ACTIVE" && (
          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              {/* END button on left */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button title="END" color="red" onPress={handleEnd} />
              </View>

              {/* DISABLE button in middle */}
              <View style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
                <Button
                  title="DISABLE BUZZERS"
                  onPress={handleDisable}
                />
              </View>

              {/* NEXT button on right */}
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Button
                  title="NEXT"
                  disabled={!ready}
                  onPress={handleNext}
                />
              </View>
            </View>
          </View>
        )}

        {/* TEMPORARY DEBUG NAV */}
        <View style={{ marginTop: 20 }}>
          <Button title="Back" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}
