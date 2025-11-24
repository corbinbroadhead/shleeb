import { Alert, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onClick: () => void;
  actionMessage?: string;
};

export default function DestructiveButton({
  text,
  onClick,
  actionMessage,
}: Props) {
  const handlePress = () => {
    Alert.alert(
      actionMessage ?? "Are you sure?",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: onClick },
      ]
    );
  };

  return (
    <Pressable onPress={handlePress} style={styles.button_style}>
      <Text style={styles.text_style}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: "red",
    width: "80%",
    height: 50,
    paddingHorizontal: 14,
    marginBottom: 10,
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "rgba(17, 12, 46, 0.15)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.70,
    shadowRadius: 4,
  },
  text_style: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  }
});
