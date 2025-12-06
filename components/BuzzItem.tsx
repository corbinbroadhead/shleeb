// components/BuzzItem.tsx
import { getAvatarSource } from "@/utils/avatarHelper";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PlayerNameText from "./JoinedPlayerNameText";

interface BuzzItemProps {
  playerId: string;
  playerName?: string;
  avatarId?: number;
  timestamp: number;
  promptStartTime?: number;
  index: number;
  onPress: (playerId: string) => void;
}

export default function BuzzItem({ 
  playerId, 
  playerName, 
  avatarId, 
  timestamp, 
  promptStartTime,
  index, 
  onPress 
}: BuzzItemProps) {
  // Calculate reaction time
  const reactionTimeMs = promptStartTime ? timestamp - promptStartTime : 0;
  const seconds = Math.floor(reactionTimeMs / 1000);
  const milliseconds = reactionTimeMs % 1000;
  const reactionTimeDisplay = `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;

  return (
    <Pressable
      onPress={() => onPress(playerId)}
      style={[
        styles.buzzItem,
        index === 0 && styles.firstPlace
      ]}
    >
      <View style={styles.leftSection}>
        <Text style={styles.rankText}>{index + 1}.</Text>
        
        <Image
          source={getAvatarSource(avatarId || 0)}
          style={styles.avatar}
        />
        
        <PlayerNameText style={styles.buzzText}>
          {playerName || `Player ${playerId.slice(0, 8)}...`}
        </PlayerNameText>
      </View>
      
      <Text style={styles.timeText}>
        {reactionTimeDisplay}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  firstPlace: {
    backgroundColor: "#FFD700",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  buzzText: {
    fontSize: 16,
    flex: 1,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
});