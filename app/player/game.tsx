import Buzzer from "@/components/Buzzer";
import useNextWait from "@/hooks/useNextWait";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function PlayerGame() {
  const [game, setGame] = useState("NEXT"); // (NEXT -> EXPIRE) -> END

  // Hook returns { waiting: boolean, ready: boolean }
  const { waiting, ready } = useNextWait(game);

  const buzz = () => {
    console.log("Buzzed!")
  }

  const renderNextState = () => {
    if (waiting) {
      // 3-second wait message
      return (
        <View style={{ marginTop: 80, alignItems: "center" }}>
          <Text style={{ fontSize: 28 }}>Next prompt incoming...</Text>
        </View>
      );
    }

    if (ready) {
      return (
        <View>
          {/* 👇 Prompt component goes here */}
          <Text>PROMPT</Text>

          {/* 👇 Buzzer component (active) goes here */}
          <Buzzer text="Press to Buzz!" onClick={buzz} enabled={true}/>
        </View>
      );
    }

    return null;
  };

  const renderExpireState = () => {
    return (
      <View>
          {/* 👇 Prompt component goes here */}
          <Text>PROMPT</Text>

          {/* 👇 Buzzer component (active) goes here */}
          <Buzzer text="Buzzer is Disabled." onClick={buzz} enabled={false}/>
        </View>
    );
  };

  const renderEndState = () => {
    return (
      <View>
        {/* 👇 End-of-game screen goes here */}
        <Text>[End screen goes here]</Text>
      </View>
    );
  };

  const renderContent = () => {
    if (game === "NEXT") return renderNextState();
    if (game === "EXPIRE") return renderExpireState();
    if (game === "END") return renderEndState();
    return <Text>Unknown game state</Text>;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
        paddingTop: 50,
      }}
    >
      {renderContent()}
    </ScrollView>
  );
}
