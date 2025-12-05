import { Modal, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import ScoreboardItem from "./ScoreboardItem";

interface Player {
  id: string;
  name: string;
  score: number;
}

interface ScoreboardModalProps {
  visible: boolean;
  players: Player[];
  allowPointAllocation: boolean;
  onClose: () => void;
  onSelectPlayer?: (player: Player) => void;
}

export default function ScoreboardModal({ 
  visible, 
  players, 
  allowPointAllocation, 
  onClose, 
  onSelectPlayer 
}: ScoreboardModalProps) {
  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable 
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()} // Prevent closing when tapping modal content
        >
          <Text style={styles.title}>Scoreboard</Text>

          <ScrollView style={styles.scrollView}>
            {sortedPlayers.length === 0 ? (
              <Text style={styles.emptyText}>No players yet</Text>
            ) : (
              sortedPlayers.map((player, index) => (
                <ScoreboardItem
                  key={player.id}
                  player={player}
                  rank={index + 1}
                  allowPointAllocation={allowPointAllocation}
                  onPress={onSelectPlayer || (() => {})}
                />
              ))
            )}
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              { opacity: pressed ? 0.75 : 1 }
            ]}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    width: "90%",
    maxHeight: "80%",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    maxHeight: 400,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#777",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});