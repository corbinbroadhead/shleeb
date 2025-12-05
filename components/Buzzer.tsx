import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text?: string;
  onClick: () => void;
  enabled?: boolean;
};

export default function Buzzer({ text, onClick, enabled=true }: Props) {
  return (
    <Pressable
      onPress={enabled ? onClick : undefined}
      style={enabled? styles.button_style : styles.button_style_disabled}
    >
      <Text style={styles.text_style}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: "purple",
    width: "95%",
    height: 350,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 200,
    shadowColor: "rgba(17, 12, 46, 0.15)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.90,
    shadowRadius: 8,
  },
  button_style_disabled: {
    backgroundColor: "gray",
    width: "95%",
    height: "95%",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 200,
    shadowColor: "rgba(17, 12, 46, 0.15)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.90,
    shadowRadius: 8,
  },
  text_style: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  }
});