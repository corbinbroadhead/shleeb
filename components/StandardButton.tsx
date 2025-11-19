import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onClick: () => void;
};

export default function StandardButton({ text, onClick }: Props) {
  return (
    <Pressable
      onPress={onClick}
      style={styles.button_style}
    >
      <Text style={styles.text_style}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: "purple",
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