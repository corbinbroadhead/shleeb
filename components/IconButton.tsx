import { Pressable, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode; 
  size: number;            
  onClick: () => void;
};

export default function IconButton({ icon, size, onClick }: Props) {
  return (
    <Pressable
      onPress={onClick}
      style={[
        styles.button_style,
        { width: size, height: size, borderRadius: size / 2 }
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",

    // Shadow (iOS)
    shadowColor: "rgba(17, 12, 46, 0.15)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 5,
  },
});
