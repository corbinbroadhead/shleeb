import { Modal, Pressable, Text, View } from "react-native";

export default function AwardPointsModal({ visible, player, onClose, onAward }) {
  if (!player) return null;

  const increments = [-100, -50, 50, 100];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "85%",
            borderRadius: 12,
            padding: 22,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>
            Award Points
          </Text>

          <Text style={{ fontSize: 20, marginBottom: 8 }}>
            {player.name}
          </Text>

          {/* Add current score display */}
          <Text style={{ fontSize: 18, color: "#666", marginBottom: 24 }}>
            Current Score: {player.score || 0}
          </Text>

          {/* Buttons */}
          <View style={{ width: "100%" }}>
            {increments.map((inc) => (
              <Pressable
                key={inc}
                onPress={() => onAward(inc)}
                style={({ pressed }) => ({
                  paddingVertical: 14,
                  marginVertical: 6,
                  borderRadius: 10,
                  backgroundColor:
                    inc > 0 ? "#4CAF50" : "#E53935",
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {inc > 0 ? `+${inc}` : inc}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => ({
              marginTop: 22,
              paddingVertical: 14,
              width: "100%",
              backgroundColor: "#777",
              borderRadius: 10,
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}