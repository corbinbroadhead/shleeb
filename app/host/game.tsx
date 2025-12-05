import AwardPointsModal from "@/components/AwardPointsModal";
import BuzzList from "@/components/BuzzList";
import Leaderboard from "@/components/Leaderboard";
import ScoreboardModal from "@/components/ScoreboardModal";
import SettingsModal from "@/components/SettingsModal";
import { promptSets } from "@/data/promptSets";
import { useHostGame } from "@/hooks/useHostGame";
import useNextWait from "@/hooks/useNextWait";
import { usePlayersRealtime } from "@/hooks/usePlayersRealtime";
import { usePromptManager } from "@/hooks/usePromptManager";
import { awardPoints } from "@/utils/awardPoints";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function HostGame() {
  const { promptSetId } = useLocalSearchParams();
  const { sendBroadcast, buzzes, clearBuzzes } = useHostGame();
  const players = usePlayersRealtime();

  // Host either sees the prompt screen or the leaderboard
  const [gameState, setGameState] = useState("ACTIVE");

  // Host may also see the scoreboard
  const [scoreboardVisible, setScoreboardVisible] = useState(false);

  const [settingsVisible, setSettingsVisible] = useState(false);

  // Prompt set management
  //const [prompt, setPrompt] = useState(null);
  const selectedSet = promptSets.find(set => set.id === promptSetId) || promptSets[0];
  const { currentPrompt, isLastPrompt, nextPrompt, promptNumber, totalPrompts } = usePromptManager(selectedSet);

  // Hook controlling the 3-second wait when NEXT is triggered
  const { waiting, ready } = useNextWait(gameState);

  // Control the point awarding states
  const [awardModalVisible, setAwardModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // ------------------------
  // BUTTON HANDLERS
  // ------------------------

  function handleSelectPlayer(player) {
    setSelectedPlayer(player);
    setAwardModalVisible(true);
  }

  async function handleAwardPoints(playerId, amount) {
    // find current score from selectedPlayer (or refetch)
    const currentScore = selectedPlayer?.score ?? 0;
    await awardPoints(playerId, currentScore, amount);
    setAwardModalVisible(false);
    setSelectedPlayer(null);
  }

  async function handleNext() {
    if (isLastPrompt) {
      await handleEnd();
      return;
    }
    const nextPromptIndex = promptNumber;
    const nextPromptText = selectedSet?.prompts[nextPromptIndex];
    await sendBroadcast("NEXT", { time: Date.now(), prompt: nextPromptText });
    nextPrompt();
    // Restart the 3-second wait
    setGameState("ACTIVE");
    clearBuzzes()
  }

  async function handleDisable() {
    await sendBroadcast("EXPIRE", { time: Date.now() });
    // Players' buzzers are disabled, but host remains ACTIVE.
  }

  async function handleEnd() {
    await sendBroadcast("END", { time: Date.now() });
    setGameState("END");
    //router.push("/host/leaderboard");
  }

  function handleSelectPlayerFromBuzz(playerId: string) {
    // Fetch the player data
    const player = players.find(p => p.id === playerId);
    if (player) {
      setSelectedPlayer(player);
      setAwardModalVisible(true);
    }
  }

  // ------------------------
  // RENDER SECTIONS
  // ------------------------

  function renderPromptArea() {
    if (gameState === "END") {
    return (
        <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 28, marginBottom: 10 }}>Final Standings</Text>
        <Leaderboard hostMode={false} onSelectPlayer={handleSelectPlayer}/>
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
        <Text style={{ fontSize: 16, color: "#667", marginBottom: 8 }}>
            Question {promptNumber} of {totalPrompts}
        </Text>
        <Text style={{ fontSize: 24 }}>
          {currentPrompt ?? "[No prompt selected]"}
        </Text>
      </View>
    );
  }

  function renderBuzzList() {
    if (gameState === "END") return null;
    return <BuzzList buzzes={buzzes} onSelectPlayer={handleSelectPlayerFromBuzz} />;
  }

  function renderScoreboardButton() {
    if (gameState === "END") return null;
    return <Button title="View Scoreboard" onPress={() => setScoreboardVisible(true)}/>;
  }

  function renderSettingsButton() {
    if (gameState === "END") return null;
    return <Button title="Settings" onPress={() => setSettingsVisible(true)}/>;
  }

  function renderSettings() {
    if (gameState === "END") return null;
    return <SettingsModal 
              visible={settingsVisible} 
              onClose={() => setSettingsVisible(false)} 
            />
  }

  function renderScoreboard() {
    if (gameState === "END") return null;
    return <ScoreboardModal
          visible={scoreboardVisible}
          players={players}
          allowPointAllocation={true}
          onClose={() => setScoreboardVisible(false)}
          onSelectPlayer={(player) => {
            setScoreboardVisible(false);
            setSelectedPlayer(player);
            setAwardModalVisible(true);
          }}
        />;
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

        <AwardPointsModal
            visible={awardModalVisible}
            player={selectedPlayer}
            onClose={() => setAwardModalVisible(false)}
            onAward={(delta) => {if (!selectedPlayer) return; handleAwardPoints(selectedPlayer.id, delta)}}
        />

        {/* Scoreboard Modal */}
        {renderScoreboard()}
        {renderScoreboardButton()}

        {/* Settings Modal */}
        {renderSettings()}
        {renderSettingsButton()}

        {/* TEMPORARY DEBUG NAV */}
        <View style={{ marginTop: 20 }}>
          <Button title="Back" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}
