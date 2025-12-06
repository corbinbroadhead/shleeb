// components/screen_renders/FinalStandingsView.tsx
import Leaderboard from "@/components/Leaderboard";
import { Text, View } from "react-native";

export default function FinalStandingsView() {
  return (
    <View>
      <Text style={{ fontSize: 28, marginBottom: 10 }}>Final Standings</Text>
      <Leaderboard hostMode={false} onSelectPlayer={null}/>
    </View>
  );
}