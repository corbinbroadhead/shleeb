import AwardPointsModal from "@/components/AwardPointsModal";
import BuzzList from "@/components/BuzzList";
import GameButton from "@/components/GameButton";
import { HostIconButton } from "@/components/HostIconButton";
import MediumPromptText from "@/components/MediumPromptText";
import ScoreboardModal from "@/components/ScoreboardModal";
import SettingsModal from "@/components/SettingsModal";
import FinalStandingsView from "@/components/screen_renders/FinalStandingsView";
import { promptSets } from "@/data/promptSets";
import { useHostGame } from "@/hooks/useHostGame";
import useNextWait from "@/hooks/useNextWait";
import { usePlayersRealtime } from "@/hooks/usePlayersRealtime";
import { usePromptManager } from "@/hooks/usePromptManager";
import { awardPoints } from "@/utils/awardPoints";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HostGame() {
  const { promptSetId } = useLocalSearchParams();
  const { sendBroadcast, buzzes, clearBuzzes } = useHostGame();
  const players = usePlayersRealtime();
  const [gameState, setGameState] = useState("ACTIVE");
  const [scoreboardVisible, setScoreboardVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  
  const selectedSet = promptSets.find(set => set.id === promptSetId) || promptSets[0];
  const { currentPrompt, isLastPrompt, nextPrompt, promptNumber, totalPrompts } = usePromptManager(selectedSet);
  const { waiting, ready } = useNextWait(gameState);
  
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
    const promptStartTime = Date.now() + 3000;
    
    await sendBroadcast("NEXT", { time: Date.now(), prompt: nextPromptText, promptStartTime });
    nextPrompt();
    setGameState("ACTIVE");
    clearBuzzes();
  }

  async function handleDisable() {
    await sendBroadcast("EXPIRE", { time: Date.now() });
  }

  async function handleEnd() {
    await sendBroadcast("END", { time: Date.now() });
    setGameState("END");
  }

  function handleSelectPlayerFromBuzz(playerId: string) {
    const player = players.find(p => p.id === playerId);
    if (player) {
      setSelectedPlayer(player);
      setAwardModalVisible(true);
    }
  }

  function handleReturnToLobby() {
    Alert.alert(
      "Are you sure?",
      "You will lose current game progress!",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => router.back() },
      ]
    );
  }

  // ------------------------
  // RENDER SECTIONS
  // ------------------------

  function renderPromptArea() {
    if (gameState === "END") {
      return <FinalStandingsView />;
    }

    if (waiting) {
      return (
        <View style={styles.promptContainer}>
          <MediumPromptText>Next prompt incoming...</MediumPromptText>
        </View>
      );
    }

    return (
      <View style={styles.promptContainer}>
        <Text style={styles.questionNumber}>
          Prompt {promptNumber} of {totalPrompts}
        </Text>
        <MediumPromptText>
          {currentPrompt ?? "[No prompt selected]"}
        </MediumPromptText>
      </View>
    );
  }

  function renderBuzzList() {
    if (gameState === "END") return null;
    if (waiting) { return null };
    return (
      <View style={styles.buzzListContainer}>
        <BuzzList buzzes={buzzes} onSelectPlayer={handleSelectPlayerFromBuzz} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        {renderPromptArea()}
        {renderBuzzList()}
      </ScrollView>

      {/* FIXED BOTTOM CONTROLS */}
      {gameState === "ACTIVE" && (
        <View style={styles.fixedControls}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <GameButton 
                title="END" 
                variant="danger"
                onPress={handleEnd} 
                size="large"
              />
            </View>

            <View style={styles.buttonWrapper}>
              <GameButton 
                title="DISABLE BUZZERS" 
                variant="secondary"
                onPress={handleDisable}
                size="large"
              />
            </View>

            <View style={styles.buttonWrapper}>
              <GameButton 
                title="NEXT"
                variant="primary"
                disabled={!ready}
                onPress={handleNext}
                size="large"
              />
            </View>
          </View>

          <View style={styles.utilityButtons}>
            <View style={styles.utilityButton}>
              <HostIconButton 
                title="Scoreboard"
                icon="trophy"
                onPress={() => setScoreboardVisible(true)}
              />
            </View>
            
            <View style={styles.utilityButton}>
              <HostIconButton 
                title="Settings"
                icon="settings"
                onPress={() => setSettingsVisible(true)}
              />
            </View>
          </View>

          <View style={styles.debugSection}>
            <GameButton 
              title="Return to Lobby" 
              variant="danger"
              onPress={handleReturnToLobby} 
            />
          </View>
        </View>
      )}

      {/* MODALS */}
      <AwardPointsModal
        visible={awardModalVisible}
        player={selectedPlayer}
        onClose={() => setAwardModalVisible(false)}
        onAward={(delta) => {
          if (!selectedPlayer) return;
          handleAwardPoints(selectedPlayer.id, delta);
        }}
      />

      {gameState !== "END" && (
        <>
          <ScoreboardModal
            visible={scoreboardVisible}
            players={players}
            allowPointAllocation={true}
            onClose={() => setScoreboardVisible(false)}
            onSelectPlayer={(player) => {
              setScoreboardVisible(false);
              setSelectedPlayer(player);
              setAwardModalVisible(true);
            }}
          />

          <SettingsModal 
            visible={settingsVisible} 
            onClose={() => setSettingsVisible(false)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: "#7C3AED",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  promptContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  waitingText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
  },
  questionNumber: {
    fontSize: 16,
    color: "#667",
    marginBottom: 8,
  },
  promptText: {
    fontSize: 24,
    color: "#333",
    lineHeight: 32,
  },
  buzzListContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  fixedControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  utilityButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  utilityButton: {
    flex: 1,
  },
  debugSection: {
    marginTop: 8,
  },
});