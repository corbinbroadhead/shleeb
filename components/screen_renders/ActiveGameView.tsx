// components/screen_renders/ActiveGameView.tsx
import Buzzer from "@/components/Buzzer";
import { StyleSheet, View } from "react-native";
import LargePromptText from "../LargePromptText";

interface ActiveGameViewProps {
  prompt: string | null;
  buzzerEnabled: boolean;
  players: any[];
  scoreboardVisible: boolean;
  onBuzz: () => void;
  onShowScoreboard?: () => void;
  onCloseScoreboard?: () => void;
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
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <LargePromptText>
          {prompt || "[Waiting for prompt...]"}
        </LargePromptText>
      </View>
      
      <View style={styles.buzzerContainer}>
        <Buzzer
          text={buzzerEnabled ? "Press to Buzz!" : "Buzzer Disabled"}
          onClick={onBuzz}
          enabled={buzzerEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  buzzerContainer: {
    alignItems: "center",
    paddingBottom: 60,
  },
});