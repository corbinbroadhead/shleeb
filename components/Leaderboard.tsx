import { usePlayersRealtime } from "@/hooks/usePlayersRealtime";
import { Pressable, Text, View } from "react-native";

export default function Leaderboard({ hostMode, onSelectPlayer }) {
  const players = usePlayersRealtime();

  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={{ marginTop: 20 }}>
      {sorted.map((p) => (
        <Pressable
          key={p.id}
          onPress={() => hostMode && onSelectPlayer(p)}
          style={{
            padding: 12,
            borderBottomWidth: 1,
            borderColor: "#ccc",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>{p.name}</Text>
          <Text style={{ fontSize: 20 }}>{p.score}</Text>
        </Pressable>
      ))}
    </View>
  );
}
