// app/player/game.tsx
import ActiveGameView from "@/components/screen_renders/ActiveGameView";
import FinalStandingsView from "@/components/screen_renders/FinalStandingsView";
import NextPromptLoadingView from "@/components/screen_renders/NextPromptLoadingView";
import { usePlayer } from "@/contexts/playerContext";
import useNextWait from "@/hooks/useNextWait";
import { usePlayerGame } from "@/hooks/usePlayerGame";
import { usePlayersRealtime } from "@/hooks/usePlayersRealtime";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function PlayerGame() {
  const { initialPrompt } = useLocalSearchParams();
  const { game, buzz, currentPrompt } = usePlayerGame();
  const players = usePlayersRealtime();
  const [scoreboardVisible, setScoreboardVisible] = useState(false);
  const { player } = usePlayer();

  const { waiting, ready } = useNextWait(game);

  // Close scoreboard when game state changes
  useEffect(() => {
    setScoreboardVisible(false);
  }, [game]);

  const renderContent = () => {
    // Show loading during NEXT transition
    if (game === "NEXT" && waiting) {
      return <NextPromptLoadingView />;
    }

    // Show active buzzer (enabled or disabled)
    if ((game === "NEXT" && ready) || game === "EXPIRE") {
      return (
        <ActiveGameView
          prompt={currentPrompt || (initialPrompt as string)}
          buzzerEnabled={game === "NEXT" && ready}
          players={players}
          scoreboardVisible={scoreboardVisible}
          onBuzz={buzz}
          //onShowScoreboard={() => setScoreboardVisible(true)}
          //onCloseScoreboard={() => setScoreboardVisible(false)}
        />
      );
    }

    // Show final standings
    if (game === "END") {
      return <FinalStandingsView />;
    }

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