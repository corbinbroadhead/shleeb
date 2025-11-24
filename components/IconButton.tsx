import { Alert, Pressable, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode;
  size: number;
  onClick: () => void;
  backgroundColor?: string;
  showConfirmation?: boolean;
  actionMessage?: string;
};

export default function IconButton({
  icon,
  size,
  onClick,
  backgroundColor = "red",
  showConfirmation = false,
  actionMessage = "Are you sure?",
}: Props) {
  
  const handlePress = () => {
    if (!showConfirmation) {
      onClick();
      return;
    }

    Alert.alert(
      actionMessage,
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: onClick },
      ]
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.button_style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_style: {
    justifyContent: "center",
    alignItems: "center",

    // Shadow (iOS)
    shadowColor: "rgba(17, 12, 46, 0.15)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});
