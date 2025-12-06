// components/screen_renders/FinalStandingsView.tsx
import Leaderboard from "@/components/Leaderboard";
import { router } from "expo-router";
import { View } from "react-native";
import LargePromptText from "../LargePromptText";
import StandardButton from "../StandardButton";

export default function FinalStandingsView() {
  return (
    <View style={{ flex: 1 }}>
      <LargePromptText style={{ fontSize: 28, marginTop: 15, marginBottom: 10 }}>
        Final Standings
      </LargePromptText>

      <Leaderboard hostMode={false} onSelectPlayer={null} />

      <View style={{ marginTop: "auto", marginBottom: 25, alignItems: "center" }}>
        <StandardButton 
          onClick={() => router.push("/")} 
          text="Exit" 
        />
      </View>
    </View>
  );
}