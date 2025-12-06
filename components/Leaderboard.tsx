// components/Leaderboard.tsx

import { usePlayersRealtime } from "@/hooks/usePlayersRealtime";
import { getAvatarSource } from "@/utils/avatarHelper";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Leaderboard({ hostMode, onSelectPlayer }) {
  const players = usePlayersRealtime();
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      {sorted.map((p, index) => {
        const rank = index + 1;

        return (
          <Pressable
            key={p.id}
            onPress={() => hostMode && onSelectPlayer?.(p)}
            style={({ pressed }) => [
              styles.item,
              rank === 1 && styles.firstPlace,
              rank === 2 && styles.secondPlace,
              rank === 3 && styles.thirdPlace,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.leftSection}>
              <Text style={styles.rankText}>{rank}</Text>

              <Image
                source={getAvatarSource(p.avatar_id || 0)}
                style={styles.avatar}
              />

              <Text style={styles.nameText}>{p.name}</Text>
            </View>

            <Text style={styles.scoreText}>{p.score}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },

  pressed: {
    opacity: 0.7,
  },

  // medal colors
  firstPlace: {
    backgroundColor: "#FFD700",
  },
  secondPlace: {
    backgroundColor: "#C0C0C0",
  },
  thirdPlace: {
    backgroundColor: "#CD7F32",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  rankText: {
    width: 30,
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
    textAlign: "center",
    color: "#333",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
  },

  scoreText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
});
