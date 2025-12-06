// components/screen_renders/ActiveGameView.tsx
import Buzzer from "@/components/Buzzer";
import ScoreboardModal from "@/components/ScoreboardModal";
import { Button, Text, View } from "react-native";

interface ActiveGameViewProps {
  prompt: string | null;
  buzzerEnabled: boolean;
  players: any[];
  scoreboardVisible: boolean;
  onBuzz: () => void;
  onShowScoreboard: () => void;
  onCloseScoreboard: () => void;
}

export default function ActiveGameView({
  prompt,
  buzzerEnabled,
  players,
  scoreboardVisible,
  onBuzz,
  onShowScoreboard,
  onCloseScoreboard,
}: ActiveGameViewProps) {
  return (
    <View>
      <Text style={{ alignItems: "center", padding: 20, fontSize: 24, textAlign: "center" }}>
        {prompt || "[Waiting for prompt...]"}
      </Text>
      
      <Button
        title="View Scoreboard"
        onPress={onShowScoreboard}
      />
      
      <ScoreboardModal
        visible={scoreboardVisible}
        players={players}
        allowPointAllocation={false}
        onClose={onCloseScoreboard}
      />
      
      <Buzzer
        text={buzzerEnabled ? "Press to Buzz!" : "Buzzer Disabled"}
        onClick={onBuzz}
        enabled={buzzerEnabled}
      />
    </View>
  );
}