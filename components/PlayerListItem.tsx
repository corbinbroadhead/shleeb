import { getAvatarSource } from "@/utils/avatarHelper";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import JoinedPlayerNameText from "./JoinedPlayerNameText";

interface PlayerListItemProps {
  player: {
    id: string;
    name: string;
    avatar_id?: number;
  };
  onKick: (playerId: string) => void;
}

export default function PlayerListItem({ player, onKick }: PlayerListItemProps) {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={getAvatarSource(player.avatar_id || 0)}
        style={styles.avatar}
      />

      {/* Username */}
      <JoinedPlayerNameText style={styles.username}>
        {player.name || player.id}
      </JoinedPlayerNameText>

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
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
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