import AvatarPicker from "@/components/AvatarPicker";
import PlayerTitleBar from "@/components/PlayerTitleBar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface WaitingLobbyViewProps {
  playerName: string;
}

export default function WaitingLobbyView({ playerName }: WaitingLobbyViewProps) {
  const title = `Welcome, ${playerName}!`;

  return (
    <View style={styles.container}>
      <PlayerTitleBar title={title} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.waitingSection}>
          <Text style={styles.waitingText}>You're all set! Hang tight while the host gets things ready...</Text>
        </View>
        
        <View style={styles.avatarSection}>
          <AvatarPicker />
          <Text style={styles.instructionText}>Select your avatar while you wait!</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  waitingSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  waitingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  avatarSection: {
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  instructionText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});