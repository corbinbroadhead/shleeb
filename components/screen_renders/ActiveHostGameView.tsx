// components/screen_renders/ActiveHostGameView.tsx
import BuzzList from "@/components/BuzzList";
import { Button, Text, View } from "react-native";

interface Buzz {
  playerId: string;
  playerName?: string;
  timestamp: number;
}

interface ActiveHostGameViewProps {
  currentPrompt: string | null;
  promptNumber: number;
  totalPrompts: number;
  buzzes: Buzz[];
  ready: boolean;
  onSelectPlayerFromBuzz: (playerId: string) => void;
  onNext: () => void;
  onDisable: () => void;
  onEnd: () => void;
}

export default function ActiveHostGameView({
  currentPrompt,
  promptNumber,
  totalPrompts,
  buzzes,
  ready,
  onSelectPlayerFromBuzz,
  onNext,
  onDisable,
  onEnd,
}: ActiveHostGameViewProps) {
  return (
    <View>
      {/* Prompt Area */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, color: "#667", marginBottom: 8 }}>
          Question {promptNumber} of {totalPrompts}
        </Text>
        <Text style={{ fontSize: 24 }}>
          {currentPrompt ?? "[No prompt selected]"}
        </Text>
      </View>

      {/* Buzz List */}
      <BuzzList buzzes={buzzes} onSelectPlayer={onSelectPlayerFromBuzz} />

      {/* Control Buttons */}
      <View style={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button title="END" color="red" onPress={onEnd} />
          </View>

          <View style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
            <Button title="DISABLE BUZZERS" onPress={onDisable} />
          </View>

          <View style={{ flex: 1, marginLeft: 8 }}>
            <Button title="NEXT" disabled={!ready} onPress={onNext} />
          </View>
        </View>
      </View>
    </View>
  );
}