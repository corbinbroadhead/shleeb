// components/BuzzList.tsx
import { StyleSheet, Text, View } from "react-native";
import BuzzItem from "./BuzzItem";

interface Buzz {
  playerId: string;
  timestamp: number;
  playerName?: string;
}

interface BuzzListProps {
  buzzes: Buzz[];
  onSelectPlayer: (playerId: string) => void;
}

export default function BuzzList({ buzzes, onSelectPlayer }: BuzzListProps) {
  if (buzzes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Waiting for players to buzz...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buzzed Players:</Text>
      {buzzes.map((buzz, index) => (
        <BuzzItem
          key={buzz.playerId}
          playerId={buzz.playerId}
          playerName={buzz.playerName}
          timestamp={buzz.timestamp}
          index={index}
          onPress={onSelectPlayer}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 20,
    color: "#666",
  },
});