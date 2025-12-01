import Buzzer from "@/components/Buzzer";
import useNextWait from "@/hooks/useNextWait";
import { usePlayerGame } from "@/hooks/usePlayerGame";
import { ScrollView, Text, View } from "react-native";

export default function PlayerGame() {
  const { game, buzz } = usePlayerGame();

  // Handles the 3-second “Next prompt incoming…” animation
  const { waiting, ready } = useNextWait(game);

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
          <Text>PROMPT</Text>
          <Buzzer text="Press to Buzz!" onClick={buzz} enabled={true} />
        </View>
      );
    }

    return null;
  };

  const renderExpire = () => (
    <View>
      <Text>PROMPT</Text>
      <Buzzer text="Buzzer Disabled" onClick={buzz} enabled={false} />
    </View>
  );

  const renderEnd = () => (
    <View>
      <Text>[End screen goes here]</Text>
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
