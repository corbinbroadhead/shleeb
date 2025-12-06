// components/AvatarPicker.tsx
import { usePlayer } from "@/contexts/playerContext";
import { Image, Pressable, StyleSheet, View } from "react-native";

const AVATAR_COUNT = 6; // 0.png through 5.png

// Map avatar IDs to require statements
const avatarImages = {
  0: require("@/assets/avatars/0.png"),
  1: require("@/assets/avatars/1.png"),
  2: require("@/assets/avatars/2.png"),
  3: require("@/assets/avatars/3.png"),
  4: require("@/assets/avatars/4.png"),
  5: require("@/assets/avatars/5.png"),
};

export default function AvatarPicker() {
  const { player, updatePlayerAvatar } = usePlayer();

  return (
    <View style={styles.container}>
      {/* Currently selected avatar (large) */}
      <View style={styles.selectedAvatarContainer}>
        <Image
          source={avatarImages[player.avatarId]}
          style={styles.selectedAvatar}
        />
      </View>

      {/* Avatar options grid */}
      <View style={styles.avatarGrid}>
        {Array.from({ length: AVATAR_COUNT }, (_, i) => i).map((id) => (
          <Pressable
            key={id}
            onPress={() => updatePlayerAvatar(id)}
            style={[
              styles.avatarOption,
              player.avatarId === id && styles.avatarOptionSelected,
            ]}
          >
            <Image source={avatarImages[id]} style={styles.avatarOptionImage} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  selectedAvatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  selectedAvatar: {
    width: "100%",
    height: "100%",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    maxWidth: 300,
  },
  avatarOption: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  avatarOptionSelected: {
    borderColor: "#4CAF50",
    borderWidth: 3,
  },
  avatarOptionImage: {
    width: "100%",
    height: "100%",
  },
});