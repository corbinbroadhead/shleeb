import { Pressable, StyleSheet, Text, View } from "react-native";

interface ScoreboardItemProps {
  player: {
    id: string;
    name: string;
    score: number;
  };
  rank: number;
  allowPointAllocation: boolean;
  onPress: (player: any) => void;
}

export default function ScoreboardItem({ player, rank, allowPointAllocation, onPress }: ScoreboardItemProps) {
  const content = (
    <View
      style={[
        styles.item,
        rank === 1 && styles.firstPlace,
        rank === 2 && styles.secondPlace,
        rank === 3 && styles.thirdPlace,
      ]}
    >
      <View style={styles.leftSection}>
        <Text style={styles.rankText}>{rank}</Text>
        <Text style={styles.nameText}>{player.name}</Text>
      </View>
      <Text style={styles.scoreText}>{player.score}</Text>
    </View>
  );

  if (allowPointAllocation) {
    return (
      <Pressable onPress={() => onPress(player)} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
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
    fontSize: 20,
    fontWeight: "700",
    marginRight: 12,
    width: 30,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "500",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
});