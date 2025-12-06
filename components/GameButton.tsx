// components/GameButton.tsx
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

type GameButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
};

export default function GameButton({ 
  title, 
  onPress, 
  disabled = false, 
  variant = "primary",
  size = "medium"
}: GameButtonProps) {
  const { width } = useWindowDimensions();
  
  // Scale font size based on screen width
  // Base sizes are for ~390px width (iPhone 13/14/15)
  const scale = width / 390;
  const fontSizes = {
    small: Math.round(14 * scale),
    medium: Math.round(17 * scale),
    large: Math.round(20 * scale),
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text 
        style={[
          styles.text, 
          { fontSize: fontSizes[size] },
          disabled && styles.disabledText
        ]}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  small: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 22,
    paddingHorizontal: 12,
  },
  large: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  primary: {
    backgroundColor: "#7C3AED", // purple
  },
  secondary: {
    backgroundColor: "#6B7280", // gray
  },
  danger: {
    backgroundColor: "#DC2626", // red
  },
  disabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: "white",
    fontWeight: "700",
    textAlign: "center"
  },
  disabledText: {
    color: "#9CA3AF",
  },
});