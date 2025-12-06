import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

type Props = {
  text?: string;
  onClick: () => void;
  enabled?: boolean;
};

export default function Buzzer({ text, onClick, enabled=true }: Props) {
  const { width } = useWindowDimensions();
  const size = Math.min(width * 0.8, 350); // 80% of screen width, max 350

  return (
    <Pressable
      onPress={enabled ? onClick : undefined}
      style={[
        styles.button_style,
        enabled ? styles.enabled : styles.disabled,
        { width: size, height: size, borderRadius: size / 2 }
      ]}
    >
      <Text style={styles.text_style}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_style: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(17, 12, 46, 0.15)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.90,
    shadowRadius: 8,
    alignSelf: "center",
  },
  enabled: {
    backgroundColor: "#7C3AED",
  },
  disabled: {
    backgroundColor: "gray",
  },
  text_style: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  }
});