import Buzzer from "@/components/Buzzer";
import Leaderboard from "@/components/Leaderboard";
import ScoreboardModal from "@/components/ScoreboardModal";
import { usePlayer } from "@/contexts/playerContext";
import useNextWait from "@/hooks/useNextWait";
import { usePlayerGame } from "@/hooks/usePlayerGame";
import { usePlayersRealtime } from "@/hooks/usePlayersRealtime";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function PlayerGame() {
  //const { playerId, playerName, initialPrompt } = useLocalSearchParams();
  const { initialPrompt } = useLocalSearchParams();
  const { game, buzz, currentPrompt } = usePlayerGame();
  const players = usePlayersRealtime();
  const [scoreboardVisible, setScoreboardVisible] = useState(false);
  const { player, updatePlayerImage, updatePlayerName } = usePlayer();
  console.log("[player] CONTEXT: player name (PlayerGame):",player.name);
  console.log("[player] CONTEXT: player id (PlayerGame):",player.id);

  // Handles the 3-second “Next prompt incoming…” animation
  const { waiting, ready } = useNextWait(game);

  useEffect(() => {
    setScoreboardVisible(false);
  }, [game]);

  const renderNext = () => {
    if (waiting) {
      return (
        <View style={{ marginTop: 80, alignItems: "center" }}>
          <Text style={{ fontSize: 28 }}>Next prompt incoming...</Text>
        </View>
      );
    }

    if (ready) {
      return (
        <View>
          <Text style={{ alignItems: "center", padding: 20 }}>
            {currentPrompt || initialPrompt}
          </Text>
          <Button
            title="View Scoreboard"
            onPress={() => setScoreboardVisible(true)}
          />
          <ScoreboardModal
            visible={scoreboardVisible}
            players={players}
            allowPointAllocation={false}
            onClose={() => setScoreboardVisible(false)}
          />
          <Buzzer text="Press to Buzz!" onClick={()=>buzz(player.id, player.name)} enabled={true} />
        </View>
      );
    }

    return null;
  };

  const renderExpire = () => (
    <View>
      <Text style={{ alignItems: "center", padding: 20 }}>
        {currentPrompt || initialPrompt}
      </Text>
      <Button
        title="View Scoreboard"
        onPress={() => setScoreboardVisible(true)}
      />
      <ScoreboardModal
        visible={scoreboardVisible}
        players={players}
        allowPointAllocation={false}
        onClose={() => setScoreboardVisible(false)}
      />
      <Buzzer text="Buzzer Disabled" onClick={()=>buzz(player.id, player.name)} enabled={false} />
    </View>
  );

    const renderEnd = () => (
    <View>
        <Text style={{ fontSize: 28, marginBottom: 10 }}>Final Standings</Text>
        <Leaderboard hostMode={false} />
    </View>
    );


  const renderContent = () => {
    if (game === "NEXT") return renderNext();
    if (game === "EXPIRE") return renderExpire();
    if (game === "END") return renderEnd();
    return <Text>Unknown game state</Text>;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 20,
        paddingTop: 50,
      }}
    >
      {renderContent()}
    </ScrollView>
  );
}
