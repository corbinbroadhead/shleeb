import { useBuzzer } from "@/contexts/buzzerContext";
import { Modal, Pressable, StyleSheet, Switch, Text, View } from "react-native";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { buzzEnabled, setBuzzEnabled } = useBuzzer();

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
          <Text style={styles.title}>Settings</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Vibrations</Text>
            <Switch 
              value={buzzEnabled} 
              onValueChange={setBuzzEnabled} 
            />
          </View>

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
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  settingLabel: {
    fontSize: 18,
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
