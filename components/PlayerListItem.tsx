import { Pressable, StyleSheet, Text, View } from "react-native";

interface PlayerListItemProps {
  player: {
    id: string;
    name: string;
  };
  onKick: (playerId: string) => void;
}

export default function PlayerListItem({ player, onKick }: PlayerListItemProps) {
  return (
    <View style={styles.container}>
      {/* Username */}
      <Text style={styles.username}>{player.name || player.id}</Text>

      {/* Kick button */}
      <Pressable
        onPress={() => onKick(player.id)}
        style={({ pressed }) => [
          styles.kickButton,
          { opacity: pressed ? 0.7 : 1 }
        ]}
      >
        <Text style={styles.kickButtonText}>Kick</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  kickButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  kickButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});