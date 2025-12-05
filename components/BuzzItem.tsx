// components/BuzzItem.tsx
import { Pressable, StyleSheet, Text } from "react-native";

interface BuzzItemProps {
  playerId: string;
  playerName?: string;
  timestamp: number;
  index: number;
  onPress: (playerId: string) => void;
}

export default function BuzzItem({ playerId, playerName, timestamp, index, onPress }: BuzzItemProps) {
  return (
    <Pressable
      onPress={() => onPress(playerId)}
      style={[
        styles.buzzItem,
        index === 0 && styles.firstPlace
      ]}
    >
      <Text style={styles.buzzText}>
        {index + 1}. {playerName || `Player ${playerId.slice(0, 8)}...`}
      </Text>
      <Text style={styles.timeText}>
        {new Date(timestamp).toLocaleTimeString()}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buzzItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstPlace: {
    backgroundColor: "#FFD700",
  },
  buzzText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
});